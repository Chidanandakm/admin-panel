import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
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
import { createCategory } from '../../redux/categorySlice';

const NewCategory = () => {
    const { loading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');


    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(
                    'Name is required'),
        }),
        onSubmit: (values) => {
            dispatch(createCategory(values))
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
                            Add a Category
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
                        value={formik.values.name}
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
    )
}

export default AppWrapper(NewCategory);