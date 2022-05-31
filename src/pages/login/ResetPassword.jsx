import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';

import './login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/userSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
    const { error, loading } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { token } = useParams()
    const [initialData, setInitialData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');


    useEffect(() => {
        setInitialData({
            password: '',
        })
    }, [])



    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            password: Yup
                .string()
                .min(6, 'Password must be at least 6 characters')
                .required(
                    'Password is required'),
        }),
        onSubmit: (values) => {
            values.token = token
            dispatch(resetPassword(values))
                .unwrap()
                .then(({ data }) => {
                    setSuccess(data);

                    setTimeout(() => {
                        data.message === 'Password reset successfully' && navigate('/login')
                    }, 1000);

                })
                .catch(err => console.log(err))
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
                            Enter Your New Password
                        </Typography>
                    </Box>
                    {error?.message && <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Typography
                            color="red"
                            variant="h6"
                        >
                            {error?.message}
                        </Typography>
                    </Box>}
                    {success?.message && <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Typography
                            color="green"
                            variant="h6"
                        >
                            {success?.message}
                        </Typography>
                    </Box>}

                    <FormControl sx={{ width: '100%', }} variant="outlined" onSubmit={formik.handleSubmit}>
                        <InputLabel >Password</InputLabel>
                        <OutlinedInput
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            name="password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            values={formik.values.password}
                            onChange={formik.handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {formik.touched.password && formik.errors.password ? (
                        <p className="danger">{formik.errors.password}</p>
                    ) : null}

                    <Box sx={{ py: 2 }}>
                        <Button
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Reset
                        </Button>
                    </Box>
                </form>
            </Container>}
        </div>
    )
}

export default ResetPassword;