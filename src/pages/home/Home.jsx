import React from 'react';
import { AppWrapper, Chart, Featured, Table, Widget } from '../../components';

import './home.scss';

const Home = () => {

    return (
        <div className="home__container">
            <div className="widgets">
                <Widget type='user' />
                <Widget type='article' />
            </div>
            <div className="charts">
                <Featured />
                <Chart />
            </div>
            <div className="listContainer">
                <div className="listTitle">Latest Users</div>
                <Table />
            </div>
        </div>
    )
}

export default AppWrapper(Home)