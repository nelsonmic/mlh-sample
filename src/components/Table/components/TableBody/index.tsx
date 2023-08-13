import React from 'react'
import { tableBodyPropType } from '../type'

const TableBody = ({ children }: tableBodyPropType) => {
    return (
        <tbody>{children}</tbody>
    )
}

export default TableBody