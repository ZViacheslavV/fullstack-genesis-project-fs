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

        if (!isMounted) return;

        if (isAuthenticated) {
          const user = await getMe();
          if (isMounted && user) setUser(user);
        } else {
          if (isMounted) clearIsAuthenticated();
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
