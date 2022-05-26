import React from 'react'
import { Navbar, Sidebar } from '../../components';
import './wrap.scss'

const AppWrapper = (Component) => function HOC() {
    return (
        <div className='container'>
            <Sidebar />
            <div className="components">
                <Navbar />
                <Component />
            </div>
        </div>
    )
}

export default AppWrapper