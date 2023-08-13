import { CustomTimestamp } from 'lib/datetime.helpers'

export const HaulageOrderFactory = (a: any) => {
  return {
    orderId: a?.ditosell_id || '',
    itemsName: a?.category || '',
    dateOrdered: CustomTimestamp(a?.created_at) || '',
    estimatedValue: a?.total_charge || '',
    recipientName: a?.receiver_name || '',
    status: a?.status || '',
    carrierName: a?.courier_name || '',
    itemList: a?.description || '',
    deliveryTime: a?.delivery_time || '',
    amount: a?.total_charge || '',
    itemImage:
      a?.item_image ||
      'https://images.unsplash.com/photo-1682672412346-630c7ae0c49a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=878&q=80',
    recipientPhone: a?.receiver_phone,
  }
}
