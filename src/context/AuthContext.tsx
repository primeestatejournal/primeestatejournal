import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured, fetchAdminProfile, upsertAdminProfile } from '../lib/supabase';
import { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
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

  // Load session on startup
  useEffect(() => {
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

  const loadUserProfile = async (currentUser: User) => {
    try {
      let prof = await fetchAdminProfile(currentUser.id);
      if (!prof) {
        // Create initial profile
        prof = {
          id: currentUser.id,
          full_name: (currentUser.user_metadata?.full_name as string) || currentUser.email?.split('@')[0] || 'Admin User',
          email: currentUser.email || null,
          role: 'admin',
        };
        await upsertAdminProfile(prof);
      }
      setProfile(prof);
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setLoading(true);
    const supabase = getSupabase();

    if (!supabase) {
      // Offline fallback login for demo purposes
      if (password.length < 4) {
        setLoading(false);
        return { error: 'Password must be at least 4 characters.' };
      }
      const mockUser = {
        id: 'admin-usr-01',
        email,
        user_metadata: { full_name: email.split('@')[0] },
      } as any;
      const mockProfile: Profile = {
        id: 'admin-usr-01',
        full_name: email.split('@')[0].toUpperCase(),
        email,
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
        email: email.trim(),
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

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error?: string }> => {
    setLoading(true);
    const supabase = getSupabase();

    if (!supabase) {
      const mockUser = {
        id: `admin-usr-${Date.now()}`,
        email,
        user_metadata: { full_name: fullName },
      } as any;
      const mockProfile: Profile = {
        id: mockUser.id,
        full_name: fullName,
        email,
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
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
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
          email: data.user.email || email,
          role: 'admin',
        };
        await upsertAdminProfile(newProf);
        setProfile(newProf);
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
        isConfigured: isSupabaseConfigured,
        signIn,
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
