import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography
} from '@mui/material';

import AppWrapper from '../wrapper/AppWrapper'
import './new.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/userSlice';

const NewUser = () => {
    const { loading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            name: Yup
                .string()
                .max(255)
                .required(
                    'Name is required'),
            password: Yup
                .string()
                .min(6, 'Password must be at least 6 characters')
                .max(255)
                .required(
                    'Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(createUser(values))
                .unwrap()
                .then(({ data }) => {
                    data.token && navigate('/users')
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
                            color="textPrimary"
                            variant="h4"
                        >
                            Create a User
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
                    <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
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
                            Add User
                        </Button>
                    </Box>

                </form>
            </Container>}
        </div>
    )
}

export default AppWrapper(NewUser);