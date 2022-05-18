import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import './featured.scss'

const Featured = () => {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total</h1>
                <MoreVertIcon fontSize='small' />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
                </div>
                <p className="title">Total Articles Published</p>
                <p className="amount">32</p>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, fugiat.</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small' />
                            <div className="resultAmount">20</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize='small' />
                            <div className="resultAmount">20</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small' />
                            <div className="resultAmount">20</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured