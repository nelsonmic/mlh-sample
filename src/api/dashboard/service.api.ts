import { HaulageOrderFactory } from 'core/models/haulageOrdersFactory'
import client from '../config'

export const getDashboardStats = async () => {
  const res = await client.get('/admin/dashboard')
  return res?.data || []
}

export const getNotifications = async () => {
  const res = await client.get('/admin/dashboard/notification')
  return res?.data?.data || []
}

export const getHaulageOrders = async () => {
  const res = await client.get('/admin/orders/?page=1&type=haulage')
  return res?.data?.data.map((data: any) => HaulageOrderFactory(data)) || []
}
