// This is the type information for all the table components folder

import { statusTextType } from '../type'

type reactChild = React.ReactNode


export type tableHeaderPropType = {
   children: reactChild
}

export type tableRowPropType = {
    children: reactChild
}

export type tableCellPropType = {
    children: reactChild,
    type?: 'head' | 'body'
}

export type tableBodyPropType = {
    children: reactChild
}

export type statusPropType = {
    text: string,
    type: statusTextType
}

export interface tableWrapperPropType {
    children: reactChild
}