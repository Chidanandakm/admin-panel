import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';

import './sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login');
        // window.location.reload();

    }

    return (
        <div className='sidebar'>
            <div className="top">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span >Admin Panel</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to={`/users`} style={{ textDecoration: 'none' }}>
                        <li>
                            <PeopleIcon className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to={`/articles`} style={{ textDecoration: 'none' }}>
                        <li>
                            <ArticleOutlinedIcon className='icon' />
                            <span>Articles</span>
                        </li>
                    </Link>
                    <Link to={`/categories`} style={{ textDecoration: 'none' }}>
                        <li>
                            <CategoryIcon className='icon' />
                            <span>Categories</span>
                        </li>
                    </Link>
                    <li>
                        <SettingsIcon className='icon' />
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <Link to={`/users/me`} style={{ textDecoration: 'none' }}>
                        <li>
                            <AccountBoxIcon className='icon' />
                            <span>Profile</span>
                        </li>
                    </Link>
                    <li onClick={handleLogout}>
                        <LogoutIcon className='icon' />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}

export default Sidebar