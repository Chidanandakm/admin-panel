import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './navbar.scss';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Search' />
                    <SearchOutlinedIcon className='icon' />
                </div>
                <div className="items">
                    <div className="item">
                        <DarkModeOutlinedIcon className='icon' />
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className='icon' />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className='icon' />
                    </div>
                    <div className="item">
                        <AccountCircleIcon className='icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar