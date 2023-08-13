import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getHaulageOrders, getNotifications } from './service.api'

export const useGetDashboardStats = () =>
  useQuery({ queryKey: ['dashboard-stats'], queryFn: getDashboardStats })

export const useGetNotifications = () =>
  useQuery({ queryKey: ['notifications'], queryFn: getNotifications })

export const useGetHaulageOrders = () =>
  useQuery({ queryKey: ['haulage_orders'], queryFn: getHaulageOrders })
