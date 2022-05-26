import React from 'react'
import { CategoryTable } from '../../components'
import AppWrapper from '../wrapper/AppWrapper'

const CategoryList = () => {
    return (
        <div><CategoryTable /></div>
    )
}

export default AppWrapper(CategoryList)