import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useAuth } from "@/context/AuthContext";

export function TopNav() {
  const { role, setRole } = useAuth();

  const roles = [
    "admin",
    "sales",
    "legal",
    "procurement",
    "inventory",
    "installation",
    "finance",
  ];

  return (
    <nav className="fixed top-0 right-0 left-[240px] h-[64px] bg-[#1e3a5f] px-6 flex items-center justify-between z-10 shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-8">
        <div className="text-white mr-4">
          <span className="text-xl font-semibold tracking-wide">Skylink</span>
        </div>
      </div>

      {/* Right Section - Notification + Role Switcher + User */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative">
          <button className="text-white hover:text-blue-200 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-500 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-xs">
            5
          </Badge>
        </div>

        {/* ROLE SWITCHER */}
        <div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              bg-white text-gray-700 text-sm 
              px-3 py-1.5 rounded-md border 
              shadow-sm cursor-pointer
              focus:outline-none
            "
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-500 text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <span className="text-white">John Doe</span>
        </div>
      </div>
    </nav>
  );
}
