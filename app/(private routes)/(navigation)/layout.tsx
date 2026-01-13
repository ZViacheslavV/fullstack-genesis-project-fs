import AuthProvider from '@/components/layout/AuthProvider/AuthProvider';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Header from '@/components/layout/Header/Header';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';

import css from './page.module.css';

//===========================================================================

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className={css.navLayout}>
        <Sidebar />
        <div className={css.container}>
          <Header />
          <Breadcrumbs />
          <main>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default PrivateLayout;
