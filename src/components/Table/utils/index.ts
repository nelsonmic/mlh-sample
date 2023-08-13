import { statusTextType } from '../type'

export const getStatusColor = (statusText: string): statusTextType => {
    let statusClass: statusTextType = undefined

    switch(statusText.toLowerCase()){
        case 'successful':
        case 'active':
            statusClass = 'success'
            break

        case 'suspended': 
        case 'canceled':
            statusClass = 'error'
            break
    }

    return statusClass
}