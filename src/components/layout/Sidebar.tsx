import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  ClipboardList,
  DollarSign,
  Truck,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  BoxIcon,
  Wrench,
  PackageCheck,
  ChartBar,
} from "lucide-react";

export function Sidebar() {
  const { role } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["/sales"]);

  const rolePermissions: Record<string, string[]> = {
    sales: [
      "/customers",
      "/sales",
      "/quotations",
      "/orders/iro",
    ],
    legal: [
      "/verification",
      "/legal-review",
      "/orders/form-berlangganan",
      "/orders/pks",
    ],
    procurement: [
      "/procurement",
    ],
    inventory: [
      "/inventory",
    ],
    installation: [
      "/iwo",
      "/deployment",
      "/bast",
    ],
    finance: [
      "/invoices",
      "/po",
      "/billing",
    ],
    admin: ["*"],
  };

  const canAccess = (path: string) => {
    if (role === "admin") return true;
    const perm = rolePermissions[role] || [];
    if (perm.includes("*")) return true;
    return perm.some((prefix) => path.startsWith(prefix));
  };

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },

    {
      name: "Sales",
      path: "/sales",
      icon: TrendingUp,
      subMenu: [
        { name: "Customers", path: "/customers" },
        { name: "Site Investment (SI)", path: "/sales/si" },
        { name: "Quotations", path: "/quotations" },
        { name: "Sales Pipeline", path: "/sales/pipeline" },
      ],
    },

    {
      name: "Order Management",
      path: "/orders",
      icon: ClipboardList,
      subMenu: [
        { name: "IRO", path: "/orders/iro" },
        { name: "Customer Legal Verification", path: "/verification" },
        { name: "Legal–Technical Review", path: "/legal-review" },
        { name: "Form Berlangganan", path: "/orders/form-berlangganan" },
        { name: "PKS", path: "/orders/pks" },
        { name: "KOM Schedule", path: "/orders/kom" },
      ],
    },

    { name: "IRO Approval", path: "/iro-approval", icon: CheckCircle },

    {
      name: "Procurement",
      path: "/procurement",
      icon: Truck,
      subMenu: [
        { name: "MGRF", path: "/procurement/mgrf" },
        { name: "PRF", path: "/procurement/prf" },
        { name: "ARF", path: "/procurement/arf" },
        { name: "POV", path: "/procurement/pov" },
        { name: "GIF", path: "/procurement/gif" },
        { name: "GRN", path: "/procurement/grn" },
      ],
    },

    {
      name: "Inventory",
      path: "/inventory",
      icon: BoxIcon,
      subMenu: [
        { name: "Assets", path: "/inventory/assets" },
        { name: "Movements", path: "/inventory/movements" },
      ],
    },

    {
      name: "Installation",
      path: "/iwo",
      icon: Wrench,
      subMenu: [{ name: "Work Orders", path: "/iwo" }],
    },

    {
      name: "Deployment",
      path: "/deployment",
      icon: PackageCheck,
      subMenu: [
        { name: "Deployment List", path: "/deployment" },
        { name: "Submit Report", path: "/deployment/new" },
      ],
    },

    {
      name: "BAST",
      path: "/bast",
      icon: FileText,
      subMenu: [{ name: "BAST List", path: "/bast" }],
    },

    {
      name: "Finance & Billing",
      path: "/billing",
      icon: DollarSign,
      subMenu: [
        { name: "Invoices", path: "/invoices" },
        { name: "Customer PO", path: "/po" },
        { name: "Recurring Billing", path: "/billing" },
        { name: "Scheduler", path: "/billing/scheduler" },
      ],
    },

    {
      name: "SLA Monitoring",
      path: "/sla",
      icon: ChartBar,
      subMenu: [{ name: "Dashboard", path: "/sla" }],
    },
  ];

  // ================================================================
  // FILTER BERDASARKAN ROLE
  // ================================================================
  const filteredMenu = menuItems
    .map((menu) => {
      if (menu.subMenu) {
        const sub = menu.subMenu.filter((s) => canAccess(s.path));
        if (sub.length === 0) return null;
        return { ...menu, subMenu: sub };
      }
      return canAccess(menu.path) ? menu : null;
    })
    .filter(Boolean);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const toggleMenu = (path: string) =>
    setExpandedMenus((prev) =>
      prev.includes(path)
        ? prev.filter((p) => p !== path)
        : [...prev, path]
    );

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-200 fixed h-full overflow-y-auto shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-navy">ERP System</h2>
        <p className="text-xs text-gray-500 mt-1 capitalize">Role: {role}</p>
      </div>

      <nav className="p-4 space-y-1">
        {filteredMenu.map((item: any) => {
          const Icon = item.icon;
          const hasSub = !!item.subMenu;
          const expanded = expandedMenus.includes(item.path);
          const active = isActive(item.path);

          return (
            <div key={item.path}>
              {hasSub ? (
                <button
                  onClick={() => toggleMenu(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${
                    active
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {expanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    active
                      ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-700 -ml-4 pl-4"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )}

              {hasSub && expanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subMenu.map((s: any) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                        isActive(s.path)
                          ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-700 -ml-4 pl-4"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="ml-8">{s.name}</span>
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
