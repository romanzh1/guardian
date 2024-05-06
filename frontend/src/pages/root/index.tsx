import React from 'react';
import { RootLayout } from 'src/layouts/root-layout';
import { AdminSidebarLayout } from 'src/layouts/admin-sidebar-layout';
import { AdminMainMenu } from 'src/widgets/admin-main-menu';
import { RootPage } from './_components';
import { AdminLayout } from '../../layouts/admin-layout';

const Page = () => {
  return (
    <RootLayout>
      <AdminLayout
        sidebar={
          <AdminSidebarLayout>
            <AdminMainMenu />
          </AdminSidebarLayout>
        }
      >
        <RootPage />
      </AdminLayout>
    </RootLayout>
  );
};

export default Page;
