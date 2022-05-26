import React from 'react';
import { ArticleTable } from '../../components';
import AppWrapper from '../wrapper/AppWrapper';

const List = () => {
    return (
        <ArticleTable />
    )
}

export default AppWrapper(List)