import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import AppWrapper from '../wrapper/AppWrapper'
import { useDispatch, useSelector } from 'react-redux';
import { createArticle } from '../../redux/articleSlice';
import './new.scss'


const NewArticle = () => {
    const { user } = useSelector(state => state.user)
    const { loading } = useSelector(state => state.article)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        if (user?.role === 'basic') {
            navigate('/not-authorized')
        }
        setInitialData({
            title: '',
            author: '',
            content: '',
            featured_image: '',
            category: '',
            media: '',
            slug: '',
            status: '',
            meta_keywords: '',
            meta_description: '',
        })
    }, [navigate])



    const handleContentChange = (event, editor) => {
        formik.setFieldValue('content', editor.getData())

    }


    const formik = useFormik({
        initialValues: initialData,

        onSubmit: async (values) => {
            dispatch(createArticle(values))
                .unwrap()
                .then((res) => {
                    if (res.status === 201) {
                        navigate('/articles')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    });
    return (
        <>
            <div className='newArticle'>
                {loading ? <div className='progress'><CircularProgress /></div> : <Container width="" className='articleContainer'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                                color="textSecondary"
                                variant="h4"
                            >
                                Create a Article
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <TextField
                                error={Boolean(formik.touched.title && formik.errors.title)}
                                style={{ width: '50%', marginRight: '10px' }}

                                helperText={formik.touched.title && formik.errors.title}
                                label="Title"
                                margin="normal"
                                name="title"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.title || ''}
                                variant="outlined"
                                required
                            />
                            <TextField
                                error={Boolean(formik.touched.slug && formik.errors.slug)}
                                style={{ width: '50%', marginLeft: '10px' }}
                                helperText={formik.touched.slug && formik.errors.slug}
                                label="Slug"
                                margin="normal"
                                name="slug"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.slug || ''}
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', height: '40px',
                            border: '1px solid lightgray', borderRadius: '5px', padding: '0px 8px', margin: '10px 0px'
                        }}>
                            <InputLabel >Featured Image</InputLabel>
                            <FileBase64
                                multiple={false}
                                onDone={(e) => {
                                    formik.setFieldValue('featured_image', e.base64)
                                }}
                            />
                        </Box>

                        <CKEditor
                            name="content"
                            ImageUpload={true}
                            editor={ClassicEditor}
                            onChange={handleContentChange}
                            data={formik.values.content}
                            config={{ placeholder: "Enter your content here" }}
                            required
                        />
                        {formik.touched.content && formik.errors.content ? (
                            formik.errors.content
                        ) : null}

                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <TextField
                                error={Boolean(formik.touched.category && formik.errors.category)}
                                style={{ width: '50%', marginRight: '10px' }}

                                helperText={formik.touched.category && formik.errors.category}
                                label="Category"
                                margin="normal"
                                name="category"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.category || ''}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.author && formik.errors.author)}
                                style={{ width: '50%', marginLeft: '10px' }}
                                helperText={formik.touched.author && formik.errors.author}
                                label="Author"
                                margin="normal"
                                name="author"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.author || ''}
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <TextField
                                error={Boolean(formik.touched.media && formik.errors.media)}
                                style={{ width: '50%', marginRight: '10px' }}

                                helperText={formik.touched.media && formik.errors.media}
                                label="Meta Keywords"
                                margin="normal"
                                name="meta_keywords"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.meta_keywords || ''}
                                variant="outlined"
                            />
                            <FormControl style={{ width: '50%', marginLeft: "10px" }}   >
                                <InputLabel id="demo-simple-select-label" >Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label='Status'
                                    name='status'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.status || ''}

                                >
                                    <MenuItem value='draft' >Draft</MenuItem>
                                    <MenuItem value='published'>Published</MenuItem>
                                    <MenuItem value='private' >Private</MenuItem>
                                    <MenuItem value='trashed' >trashed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.meta_description && formik.errors.meta_description)}
                            fullWidth
                            multiline rows={3}
                            helperText={formik.touched.meta_description && formik.errors.meta_description}
                            label="Meta Description"
                            margin="normal"
                            name="meta_description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.meta_description || ''}
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Add
                            </Button>
                        </Box>

                    </form>
                </Container>}
            </div>
        </>
    )
}

export default AppWrapper(NewArticle);