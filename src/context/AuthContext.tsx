import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { 
  getSupabase, 
  getStoredSupabaseConfig, 
  saveCustomSupabaseConfig, 
  clearCustomSupabaseConfig, 
  SupabaseConfigInfo, 
  fetchAdminProfile, 
  upsertAdminProfile 
} from '../lib/supabase';
import { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isConfigured: boolean;
  supabaseConfig: SupabaseConfigInfo;
  updateSupabaseConfig: (url: string, anonKey: string) => boolean;
  resetSupabaseConfig: () => void;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithOtp: (email: string) => Promise<{ error?: string; message?: string }>;
  verifyOtp: (email: string, token: string) => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string; message?: string }>;
  resendConfirmationEmail: (email: string) => Promise<{ error?: string; message?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string; needsEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  updateProfile: (fullName: string) => Promise<{ error?: string }>;
  loginAsDemoAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfigInfo>(getStoredSupabaseConfig());

  const initAuth = useCallback(() => {
    const config = getStoredSupabaseConfig();
    setSupabaseConfig(config);
    const supabase = getSupabase();

    if (!supabase) {
      // Check local storage for mock/demo session
      try {
        const storedAdmin = localStorage.getItem('pej_active_admin_user');
        if (storedAdmin) {
          const parsed = JSON.parse(storedAdmin);
          setUser(parsed.user);
          setProfile(parsed.profile);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
      return;
    }

    // 1. Get initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.error('Error fetching session:', err);
      setLoading(false);
    });

    // 2. Listen to real-time auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        await loadUserProfile(currentSession.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load session on startup
  useEffect(() => {
    const cleanup = initAuth();
    return cleanup;
  }, [initAuth]);

  const updateSupabaseConfig = (url: string, anonKey: string): boolean => {
    const success = saveCustomSupabaseConfig(url, anonKey);
    if (success) {
      initAuth();
    }
    return success;
  };

  const resetSupabaseConfig = () => {
    clearCustomSupabaseConfig();
    initAuth();
  };

  const loadUserProfile = async (currentUser: User) => {
    try {
      let prof = await fetchAdminProfile(currentUser.id);
      if (!prof) {
        // Create initial default admin profile
        prof = {
          id: currentUser.id,
          full_name: (currentUser.user_metadata?.full_name as string) || currentUser.email?.split('@')[0] || 'Admin User',
          email: currentUser.email || null,
          role: 'admin',
        };
        try {
          await upsertAdminProfile(prof);
        } catch (e) {
          console.warn('Could not persist profile to Supabase public.profiles:', e);
        }
      }
      setProfile(prof);
      try {
        localStorage.setItem('pej_active_admin_user', JSON.stringify({ user: currentUser, profile: prof }));
      } catch (e) {
        console.error(e);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      // Fallback profile so user is never blocked from admin view
      const fallbackProf: Profile = {
        id: currentUser.id,
        full_name: (currentUser.user_metadata?.full_name as string) || currentUser.email?.split('@')[0] || 'Admin User',
        email: currentUser.email || null,
        role: 'admin',
      };
      setProfile(fallbackProf);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      // Offline fallback login for demo purposes
      if (password.length < 4) {
        setLoading(false);
        return { error: 'Password must be at least 4 characters.' };
      }
      const mockUser = {
        id: 'admin-usr-01',
        email: cleanEmail,
        user_metadata: { full_name: cleanEmail.split('@')[0] },
      } as any;
      const mockProfile: Profile = {
        id: 'admin-usr-01',
        full_name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        role: 'admin',
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('pej_active_admin_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await loadUserProfile(data.user);
      }
      return {};
    } catch (err: any) {
      setLoading(false);
      return { error: err.message || 'An unexpected authentication error occurred.' };
    }
  };

  const signInWithOtp = async (email: string): Promise<{ error?: string; message?: string }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      const mockUser = {
        id: 'admin-usr-otp',
        email: cleanEmail,
        user_metadata: { full_name: cleanEmail.split('@')[0] },
      } as any;
      const mockProfile: Profile = {
        id: 'admin-usr-otp',
        full_name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        role: 'admin',
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('pej_active_admin_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return { message: 'Demo OTP login successful.' };
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/admin` : undefined,
        },
      });
      setLoading(false);
      if (error) {
        return { error: error.message };
      }
      return { message: `Magic link & OTP code sent to ${cleanEmail}. Please check your email inbox.` };
    } catch (err: any) {
      setLoading(false);
      return { error: err.message || 'Failed to send OTP code.' };
    }
  };

  const verifyOtp = async (email: string, token: string): Promise<{ error?: string }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      const mockUser = {
        id: 'admin-usr-verified',
        email: cleanEmail,
        user_metadata: { full_name: cleanEmail.split('@')[0] },
      } as any;
      const mockProfile: Profile = {
        id: 'admin-usr-verified',
        full_name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        role: 'admin',
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('pej_active_admin_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: token.trim(),
        type: 'email',
      });

      if (error) {
        setLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await loadUserProfile(data.user);
      }
      return {};
    } catch (err: any) {
      setLoading(false);
      return { error: err.message || 'Failed to verify OTP code.' };
    }
  };

  const resetPassword = async (email: string): Promise<{ error?: string; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      return { message: `Password reset link simulated for ${cleanEmail}.` };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/admin` : undefined,
      });

      if (error) {
        return { error: error.message };
      }
      return { message: `Password reset instructions sent to ${cleanEmail}. Please check your email inbox.` };
    } catch (err: any) {
      return { error: err.message || 'Failed to send password reset email.' };
    }
  };

  const resendConfirmationEmail = async (email: string): Promise<{ error?: string; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      return { message: `Confirmation email re-sent to ${cleanEmail}.` };
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: cleanEmail,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/admin` : undefined,
        },
      });

      if (error) {
        return { error: error.message };
      }
      return { message: `Verification email re-sent to ${cleanEmail}. Check your inbox/spam folder.` };
    } catch (err: any) {
      return { error: err.message || 'Failed to re-send confirmation email.' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error?: string; needsEmailConfirmation?: boolean }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      const mockUser = {
        id: `admin-usr-${Date.now()}`,
        email: cleanEmail,
        user_metadata: { full_name: fullName },
      } as any;
      const mockProfile: Profile = {
        id: mockUser.id,
        full_name: fullName,
        email: cleanEmail,
        role: 'admin',
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('pej_active_admin_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/admin` : undefined,
        },
      });

      if (error) {
        setLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        // Create matching public.profile row
        const newProf: Profile = {
          id: data.user.id,
          full_name: fullName.trim(),
          email: data.user.email || cleanEmail,
          role: 'admin',
        };
        try {
          await upsertAdminProfile(newProf);
        } catch (e) {
          console.warn('Could not save initial profile to Supabase:', e);
        }
        setProfile(newProf);

        // Check if email confirmation is required by Supabase (session is null)
        if (!data.session) {
          setLoading(false);
          return {
            needsEmailConfirmation: true,
          };
        }
      }

      setLoading(false);
      return {};
    } catch (err: any) {
      setLoading(false);
      return { error: err.message || 'Failed to create admin account.' };
    }
  };

  const signOut = async () => {
    setLoading(true);
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('pej_active_admin_user');
    setUser(null);
    setSession(null);
    setProfile(null);
    setLoading(false);
  };

  const updateProfile = async (fullName: string): Promise<{ error?: string }> => {
    if (!user) return { error: 'No active session' };

    const updatedProf: Profile = {
      id: user.id,
      full_name: fullName.trim(),
      email: user.email || null,
      role: profile?.role || 'admin',
    };

    setProfile(updatedProf);
    const res = await upsertAdminProfile(updatedProf);
    if (!res.success) {
      return { error: res.error };
    }
    return {};
  };

  const loginAsDemoAdmin = () => {
    const demoUser = {
      id: 'demo-admin-uuid-001',
      email: 'admin@primeestatejournal.ng',
      user_metadata: { full_name: 'Chief Executive Admin' },
    } as any;
    const demoProfile: Profile = {
      id: 'demo-admin-uuid-001',
      full_name: 'Chief Executive Admin',
      email: 'admin@primeestatejournal.ng',
      role: 'admin',
    };
    setUser(demoUser);
    setProfile(demoProfile);
    localStorage.setItem('pej_active_admin_user', JSON.stringify({ user: demoUser, profile: demoProfile }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConfigured: supabaseConfig.isValid,
        supabaseConfig,
        updateSupabaseConfig,
        resetSupabaseConfig,
        signIn,
        signInWithOtp,
        verifyOtp,
        resetPassword,
        resendConfirmationEmail,
        signUp,
        signOut,
        updateProfile,
        loginAsDemoAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
