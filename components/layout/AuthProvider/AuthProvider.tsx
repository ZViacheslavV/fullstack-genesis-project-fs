'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthUserStore } from '@/lib/store/authStore';
import { useEffect /* , useState */ } from 'react';

interface Props {
  children: React.ReactNode;
}

//================================================================

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthUserStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthUserStore(
    (state) => state.clearIsAuthenticated
  );

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        console.log('isAuthenticated:', isAuthenticated); //TODO remove console.log

        if (!isMounted) return;

        if (isAuthenticated) {
          const { user } = await getMe();
          if (isMounted && user) setUser(user);

          console.log('User:', user); //TODO remove console.log
        } else {
          if (isMounted) clearIsAuthenticated();

          console.log('Cleared auth, isAuth:', isAuthenticated); //TODO remove console.log
        }
      } catch (error) {
        console.error('AuthProvider error:', error);
        if (isMounted) clearIsAuthenticated();
      } finally {
        // if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearIsAuthenticated]);

  /*  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111',
          color: '#fff',
        }}
      >
        <div className="loader">Loading...</div>
      </div>
    );
  } */

  return children;
};

export default AuthProvider;

/* 'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthUserStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthUserStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthUserStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);
  return children;
};

export default AuthProvider; */
