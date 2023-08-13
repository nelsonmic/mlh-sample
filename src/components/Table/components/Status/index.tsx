import React from 'react'
import { statusPropType } from '../type'
import './index.scss'


const Status = ({ text, type }: statusPropType) => {
    return (
        <div className={`status ${type}`}>{text}</div>
    )
}

export default Status