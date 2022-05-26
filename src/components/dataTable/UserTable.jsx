import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import './datatable.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/userSlice';
import { LinearProgress } from '@mui/material';



const UserTable = () => {
    const { users, user, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteUser(id))
            .unwrap()
            .then(() => dispatch(getUsers()))
            .catch(err => console.log(err))

    }


    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 230 },
        { field: 'email', headerName: 'Email', width: 290 },
        {
            field: 'role', headerName: 'Role', width: 200,
            renderCell: (params) => {
                return <div className={`cellWithRole ${params.row.role}`}>{params.row.role}</div>
            }
        }
    ];

    const actionColumn = [{
        field: 'action',
        headerName: 'Action',
        width: 160,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <div className="editButton" onClick={() => navigate(`/users/${params.row._id}`)}>Edit</div>
                    {user?.role === 'admin' && <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>}
                </div>
            )
        }
    },]


    return (
        <div className='datatable'>
            <div className="data__table__title">
                Users
                <Link to={`/users/new`} className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                sx={{ fontSize: '18px' }}
                components={{
                    LoadingOverlay: LinearProgress,
                }}
                loading={loading}
                rows={users}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row._id}
                showColumnRightBorder={true}
                showCellRightBorder={true}
            />
        </div>
    )
}

export default UserTable;