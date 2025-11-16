import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  ClipboardList, 
  DollarSign, 
  Truck, 
  FileText,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon: any;
  subMenu?: SubMenuItem[];
}

export function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["/quotations"]);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Customer", path: "/customers", icon: Users },
    {
      name: "Sales & Quotation",
      path: "/quotations",
      icon: TrendingUp,
      subMenu: [
        { name: "Quotations", path: "/quotations" },
        { name: "Sales Pipeline", path: "/sales/pipeline" },
      ],
    },
    { name: "Order Management", path: "/orders", icon: ClipboardList },
    { name: "Finance", path: "/finance", icon: DollarSign },
    { name: "Deployment", path: "/deployment", icon: Truck },
    { name: "Reports", path: "/reports", icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isSubMenuActive = (subMenu: SubMenuItem[]) => {
    return subMenu.some(item => location.pathname.startsWith(item.path));
  };

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-200 fixed h-full overflow-y-auto">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-navy">ERP System</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubMenu = item.subMenu && item.subMenu.length > 0;
          const isExpanded = expandedMenus.includes(item.path);
          const isParentActive = isActive(item.path) || (hasSubMenu && isSubMenuActive(item.subMenu));

          return (
            <div key={item.path}>
              {/* Main Menu Item */}
              {hasSubMenu ? (
                <button
                  onClick={() => toggleMenu(item.path)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                    ${
                      isParentActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600 -ml-4 pl-4"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )}

              {/* Sub Menu Items */}
              {hasSubMenu && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subMenu!.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`
                        flex items-center px-4 py-2 rounded-lg transition-colors text-sm
                        ${
                          isActive(subItem.path)
                            ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-600 -ml-4 pl-4"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      <span className="ml-8">{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}