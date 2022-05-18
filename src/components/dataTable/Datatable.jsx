import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import './datatable.scss'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/userSlice';


const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'firstName', headerName: 'Name', width: 200 },
    { field: 'lastName', headerName: 'Email', width: 250 },
    {
        field: 'role', headerName: 'Role', width: 200,
        renderCell: (params) => {
            return <div className={`cellWithRole ${params.row.role}`}>{params.row.role}</div>
        }
    },

];

const actionColumn = [{
    field: 'action',
    headerName: 'Action',
    width: 160,
    renderCell: () => {
        return (
            <div className='cellAction'>
                <div className="editButton" onClick=''>Edit</div>
                <div className="deleteButton" onClick=''>Delete</div>
            </div>
        )
    }
},]

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', role: 'admin' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', role: 'basic' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', role: 'basic' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', role: 'editor' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', role: 'basic' },
    { id: 6, lastName: 'Melisandre', firstName: null, role: 'basic' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', role: 'basic' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', role: 'basic' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', role: 'basic' },
];


const Datatable = () => {
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])


    console.log(users);
    return (
        <div className='datatable'>
            <div className="data__table__title">
                Users
                <Link to={`/users/new`} className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                rows={rows}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[1]}
            // checkboxSelection
            />
        </div>
    )
}

export default Datatable