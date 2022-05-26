import React from 'react';
import { ArticleTable, Datatable } from '../../components';
import AppWrapper from '../../wrapper/AppWrapper';

// import './list.scss';

const List = () => {
    return (
        <ArticleTable />
    )
}

export default AppWrapper(List)