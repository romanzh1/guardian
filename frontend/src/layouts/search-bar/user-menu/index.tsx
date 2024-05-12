import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './index.module.scss';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.userMenuContainer}>
            <AccountCircleIcon onClick={handleMenu} style={{ fontSize: '3rem', cursor: 'pointer', color: 'white' }} />
            <span className={styles.username}>zhr1kroman@gmail.com</span>
            <ArrowDropDownIcon onClick={handleMenu} style={{ color: 'white', cursor: 'pointer' }} />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Add account</MenuItem>
                <MenuItem onClick={handleClose}>Exit</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;