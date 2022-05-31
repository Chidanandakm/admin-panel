import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import FileBase64 from 'react-file-base64';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    InputLabel,
    TextField,
    Typography
} from '@mui/material';

import './new.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AppWrapper } from '../../components';
import { getCategory, updateCategory } from '../../redux/categorySlice';

const UpdateCategory = () => {
    const { loading } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const { id } = useParams()


    const [errorMessage, setErrorMessage] = useState('');
    const [initialData, setInitialData] = useState({
        name: '',
        featured_image: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(getCategory(id))
                .unwrap()
                .then(({ data }) => {
                    setInitialData({ id: data._id, name: data.name, featured_image: data.featured_image })
                })
        }
    }, [location])


    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(
                    'Name is required'),
        }),
        onSubmit: (values) => {
            dispatch(updateCategory(values))
                .unwrap()
                .then(({ data }) => {
                    data && navigate('/categories')
                })
                .catch(({ data }) => {
                    setErrorMessage(data.message)
                })
        }
    });
    return (
        <div className='newUser'>
            {loading ? <div className='progress'><CircularProgress /></div> : <Container maxWidth="xs" className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography
                            color="textSecondary"
                            variant="h4"
                        >
                            Update a Category
                        </Typography>
                    </Box>
                    {errorMessage && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Typography
                            color="red"
                            variant="h6"
                        >
                            {errorMessage}
                        </Typography>                        </Box>}

                    <TextField
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        fullWidth
                        helperText={formik.touched.name && formik.errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.name || ''}
                        variant="outlined"
                    />
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
                    <Box style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100px',
                        border: '1px solid lightgray', borderRadius: '5px', margin: '10px 0px'
                    }}>
                        <img
                            style={{ width: '50%', height: '100px', objectFit: 'cover' }}
                            src={formik.values.featured_image}
                            alt={formik.values.name}
                            loading="lazy"
                        />
                    </Box>


                    <Box sx={{ py: 2 }}>
                        <Button
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Update
                        </Button>
                    </Box>

                </form>
            </Container>}
        </div>
    )
}

export default AppWrapper(UpdateCategory);