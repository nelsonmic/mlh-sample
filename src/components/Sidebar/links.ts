import Tracking from '../../assets/icons/tracking.png'
import Reports from '../../assets/icons/reports.png'
import Transactions from '../../assets/icons/transaction.png'
import Newsletters from '../../assets/icons/newsletter.png'
import Waitlist from '../../assets/icons/waitlist.png'
import Settings from '../../assets/icons/setting.png'
import { Routes } from 'core/routing'

interface Links {
  name: string
  icon: string
  path: string
}

const navlinks: Links[] = [
  {
    name: 'Tracking',
    icon: Tracking,
    path: Routes.Tracking,
  },
  {
    name: 'Reports',
    icon: Reports,
    path: Routes.Reports,
  },
  {
    name: 'Transactions',
    icon: Transactions,
    path: Routes.Transactions,
  },
  {
    name: 'Newsletters',
    icon: Newsletters,
    path: Routes.Newsletter,
  },
  {
    name: 'Users',
    icon: Waitlist,
    path: Routes.Users,
  },
  {
    name: 'Settings',
    icon: Settings,
    path: Routes.Settings,
  },
]

export default navlinks
