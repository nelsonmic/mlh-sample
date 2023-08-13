import { useLocation } from 'react-router-dom'
import { Routes } from '../core/routing'

type useValidHaulageRouteOverload = {
  (value?: string): boolean
  (value?: string[]): boolean
}

export const useValidHaulageRoute: useValidHaulageRouteOverload = (value: unknown): boolean => {
  const path = useLocation()
  let haulageRoutes = [Routes.Haulage, Routes.EditHaulage]

  if (typeof value === 'string') {
    haulageRoutes.push(value || '')
  } else if (Array.isArray(value)) {
    haulageRoutes = [...haulageRoutes, ...value]
  }

  const isValidRoute = haulageRoutes.includes(path.pathname || '')
  return isValidRoute
}
