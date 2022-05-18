import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import './widget.scss'



const Widget = ({ type }) => {
    let data;

    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: 'USERs',
                icon: <PersonOutlinedIcon className='icon' style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                }} />,
                isMoney: false,
                link: "see all Users"
            }
            break;
        case 'article':
            data = {
                title: 'Articles',
                icon: <MonetizationOnOutlinedIcon className='icon' style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                />,
                isMoney: false,
                link: "see all articles"
            }
            break;

        default:
            break;
    }
    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff}</div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget