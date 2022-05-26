import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
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

import './new.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../redux/userSlice';
import { AppWrapper } from '../../components';

const UpdateUser = () => {
    const { loading } = useSelector(state => state.user);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState({
        name: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(getUser(id))
                .unwrap()
                .then(({ data }) => {
                    setInitialData({ id: data._id, name: data.name, email: data.email, role: data.role })
                })
        }
    }, [location])

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
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
            role: Yup
                .string()
                .max(255)
                .required(
                    'Role is required'),

        }),
        onSubmit: (values) => {
            dispatch(updateUser(values))
                .unwrap()
                .then((data) => {
                    if (data.status === 200) {
                        navigate('/users')
                    }

                })
                .catch(({ data }) => setErrorMessage(data.message))

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
                            Update User
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
                        error={Boolean(formik.errors.name && formik.touched.name)}
                        fullWidth
                        helperText={formik.errors.name && formik.touched.name && formik.errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.name || ''}
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
                        value={formik.values.email || ''}
                        variant="outlined"
                    />

                    <FormControl fullWidth style={{ marginTop: 15 }}>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label='Role'
                            name='role'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.role || ''}

                        >
                            <MenuItem value='admin' >Admin</MenuItem>
                            <MenuItem value='editor'>Editor</MenuItem>
                            <MenuItem value='basic' >Basic</MenuItem>
                        </Select>
                    </FormControl>


                    <Box sx={{ py: 2 }}>

                        <Button
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="medium"
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

export default AppWrapper(UpdateUser);