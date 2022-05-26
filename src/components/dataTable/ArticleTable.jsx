import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress, LinearProgress } from '@mui/material';

import './datatable.scss'
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticle, getArticles } from '../../redux/articleSlice';



const ArticleTable = () => {
    const { user } = useSelector(state => state.user)
    const { articles, loading } = useSelector(state => state.article);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch])

    const handleDelete = (id) => {

        dispatch(deleteArticle(id))
            .unwrap()
            .then(() => dispatch(getArticles()))
            .catch(err => console.log(err))

    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'content', headerName: 'Content', width: 290 },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'author', headerName: 'Author', width: 100 },
        {
            field: 'status', headerName: 'Status', width: 100,
            renderCell: (params) => {
                return <div className={`cellWithRole ${params.row.status}`}>{params.row.status}</div>
            }
        },
        { field: 'meta_keywords', headerName: 'Meta Keyword', width: 110 },
        { field: 'meta_description', headerName: 'Meta Description', width: 150 },
    ];

    const actionColumn = [{
        field: 'action',
        headerName: 'Action',
        width: 130,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <div className="editButton" onClick={() => navigate(`/articles/${params.row._id}`)}>Edit</div>
                    {user?.role === 'admin' && <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>}
                </div>
            )
        }
    },]




    return (
        <>
            <div className='datatable'>
                <div className="data__table__title">
                    Articles
                    <Link to={`/articles/new`} className='link'>
                        Add New
                    </Link>
                </div>

                <DataGrid
                    components={{
                        LoadingOverlay: LinearProgress,
                    }}
                    loading={loading}
                    rows={articles}
                    columns={columns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[1]}
                    getRowId={(row) => row._id}
                    autoPageSize={true}
                />
            </div>
        </>
    )
}

export default ArticleTable