import React, { useState } from 'react';
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import UserMenu from './user-menu';
import { GuardianSidebarLayout } from 'src/layouts/guardian-sidebar-layout';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.name}>
                <GuardianSidebarLayout />
            </div>
            <label className={styles.searchLabel}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search vault"
                    value={query}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </label>
            <div className={styles.userMenuContainer}>
                <UserMenu />
            </div>
        </div>
    );
};

export default SearchBar;