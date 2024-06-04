import React, { useState } from 'react';
import { RootLayout } from 'src/layouts/root-layout';
import { GuardianMainMenu } from 'src/widgets/guardian-main-menu';
import { RootPage } from './_components';
// import { SecureNotePage} from "./_components/secure-note-page";
import { AdminLayout } from '../../layouts/admin-layout';
import SearchBar from "../../layouts/search-bar";

const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <RootLayout>
            <SearchBar onSearch={handleSearch} />
            <AdminLayout
                sidebar={<GuardianMainMenu searchTerm={searchTerm} />}
            >
                <RootPage />
            </AdminLayout>
        </RootLayout>
    );
};

export default Page;
