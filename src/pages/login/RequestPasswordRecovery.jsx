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
    Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import './login.scss'
import { requestResetPassword } from '../../redux/userSlice';

const RequestPasswordRecovery = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch()

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
        }),
        onSubmit: (values) => {
            dispatch(requestResetPassword(values))
                .unwrap()
                .then(({ data }) => {
                    setSuccess(data);
                    setError('')
                })
                .catch(({ data }) => { setError(data.message); setSuccess('') })
        }
    });
    return (
        <div className='form'>
            {loading ? <CircularProgress /> : <Container maxWidth="xs" className='container' >
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography
                            color="textSecondary"
                            variant="h5"
                        >
                            Request Password Recovery
                        </Typography>
                    </Box>
                    {error && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Typography
                            color="red"
                            variant="h6"
                        >
                            {error}
                        </Typography>
                    </Box>}
                    {success?.message && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Typography
                            color="green"
                            variant="h6"
                        >
                            {success?.message}
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

                    <Box sx={{ py: 2 }}>
                        <Button
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Container>}
        </div>
    )
}

export default RequestPasswordRecovery;