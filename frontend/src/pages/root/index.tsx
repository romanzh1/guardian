import React from 'react';
import { RootLayout } from 'src/layouts/root-layout';
import { GuardianMainMenu } from 'src/widgets/guardian-main-menu';
import { RootPage } from './_components';
import { AdminLayout } from '../../layouts/admin-layout';
import SearchBar from "../../layouts/search-bar";

const Page = () => {
    return (
        <RootLayout>
            <SearchBar />
            <AdminLayout
                sidebar={<GuardianMainMenu />}
            >
                <RootPage />
            </AdminLayout>
        </RootLayout>
    );
};


export default Page;
