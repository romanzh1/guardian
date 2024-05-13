import React from 'react';
import { RootLayout } from 'src/layouts/root-layout';
import { AdminSidebarLayout } from 'src/layouts/admin-sidebar-layout';
import { GuardianMainMenu } from 'src/widgets/guardian-main-menu';
import { RootPage } from './_components';
import { AdminLayout } from '../../layouts/admin-layout';
import SearchBar from "../../layouts/search-bar";
//import FooterActions from "../../layouts/footer";

const Page = () => {
    return (
        <RootLayout>
            <SearchBar />
            <AdminLayout
                sidebar={
                    <AdminSidebarLayout>
                        <GuardianMainMenu />
                    </AdminSidebarLayout>
                }
            >
                <RootPage />
               {/*<FooterActions />*/}
            </AdminLayout>
        </RootLayout>
    );
};

export default Page;
