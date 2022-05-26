import React from 'react'
import { CircularProgress } from '@mui/material'

import './loading.scss'


const Loading = () => {
    return (
        <div className='progress'><CircularProgress /></div>
    )
}

export default Loading