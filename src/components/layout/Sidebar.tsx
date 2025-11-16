import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  ClipboardList,
  DollarSign,
  Truck,
  FileText 
} from 'lucide-react'

export function Sidebar() {
  const location = useLocation()
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Customer', path: '/customers', icon: Users },
    { name: 'Sales & Quotation', path: '/sales', icon: TrendingUp },
    { name: 'Order Management', path: '/orders', icon: ClipboardList },
    { name: 'Finance', path: '/finance', icon: DollarSign },
    { name: 'Deployment', path: '/deployment', icon: Truck },
    { name: 'Reports', path: '/reports', icon: FileText },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-200 fixed h-full overflow-y-auto">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-navy">ERP System</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600 -ml-4 pl-4'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}