import React, {ChangeEvent, useState} from 'react';
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import UserMenu from './user-menu';
import { GuardianSidebarLayout } from 'src/layouts/guardian-sidebar-layout';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Передаем значение поиска в родительский компонент
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
                    value={searchTerm}
                    onChange={handleChange}
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