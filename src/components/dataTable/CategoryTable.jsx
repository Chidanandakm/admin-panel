import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import './datatable.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { deleteCategory, getCategories } from '../../redux/categorySlice';

const CategoryTable = () => {
    const { user, } = useSelector(state => state.user);
    const { categories, loading } = useSelector(state => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(categories);


    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
            .unwrap()
            .then(() => dispatch(getCategories()))
            .catch(err => console.log(err))

    }


    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Category', width: 230 },
        {
            field: 'featured_image', headerName: 'Status', width: 290,
            renderCell: (params) => {
                return <div className='featured_image'><img src={params.row.featured_image} alt={params.row.name} /></div>
            }
        },
    ];

    const actionColumn = [{
        field: 'action',
        headerName: 'Action',
        width: 160,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <div className="editButton" onClick={() => navigate(`/categories/${params.row._id}`)}>Edit</div>
                    {user?.role === 'admin' && <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>}
                </div>
            )
        }
    },]
    return (
        <div className='datatable'>
            <div className="data__table__title">
                Category
                <Link to={`/categories/new`} className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                sx={{ fontSize: '18px' }}
                components={{ LoadingOverlay: LinearProgress, }}
                loading={loading}
                rows={categories}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row._id}
                showColumnRightBorder={true}
                showCellRightBorder={true}
                rowHeight={100}
            />
        </div>
    )
}

export default CategoryTable