import React from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/userSlice';
import './login.scss'

const Login = () => {
    const { error, loading } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: 'test@gmail.com',
            password: '123456',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            password: Yup
                .string()
                .min(6, 'Password must be at least 6 characters')
                .max(255)
                .required(
                    'Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(userLogin(values))
                .unwrap()
                .then(({ data }) => {
                    if (data.token) {
                        localStorage.setItem('token', data.token)
                        navigate('/users')
                    }

                })
                .catch(err => console.log(err))
        }
    });
    return (
        <div className='form'>
            {loading ? <CircularProgress /> : <Container maxWidth="xs" className='container' >
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography
                            color="textSecondary"
                            variant="h5"
                        >
                            Sign In to your account
                        </Typography>
                    </Box>
                    {error?.message && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Typography
                            color="red"
                            variant="h6"
                        >
                            {error?.message}
                        </Typography>
                    </Box>}
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
                            Login
                        </Button>
                    </Box>
                </form>
            </Container>}
        </div>
    )
}

export default Login