import { tableCellPropType } from '../type'

const TableCell = ({ children, type }: tableCellPropType) => {

    if (type === 'head') return <th>{children}</th>

    return (
        <>
            <td>{children}</td>
        </>
    )
}

export default TableCell