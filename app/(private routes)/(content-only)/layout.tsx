import AuthProvider from '@/components/layout/AuthProvider/AuthProvider';

//===========================================================================

function PrivateCleanLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default PrivateCleanLayout;
