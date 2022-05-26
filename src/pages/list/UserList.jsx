import React from 'react';
import { UserTable } from '../../components';
import AppWrapper from '../wrapper/AppWrapper';

// import './list.scss';

const UserList = () => {
    return (
        <UserTable />
    )
}

export default AppWrapper(UserList)