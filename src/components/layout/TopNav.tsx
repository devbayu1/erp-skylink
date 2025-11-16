import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

export function TopNav() {
  const menuItems = ["Sales", "Orders", "Finance", "Deployment", "Reports"];

  return (
    <nav className="fixed top-0 right-0 left-[240px] h-[64px] bg-[#1e3a5f] px-6 flex items-center justify-between z-10 shadow-md">
      {/* Left Section - Logo and Menu Items */}
      <div className="flex items-center gap-8">
        <div className="text-white mr-4">
          <span className="text-xl">Skylink</span>
        </div>

        {/* <div className="flex items-center gap-6">
          {menuItems.map((item) => (
            <button key={item} className="text-white hover:text-blue-200 transition-colors">
              {item}
            </button>
          ))}
        </div> */}
      </div>

      {/* Center - Search Icon */}
      {/* <div className="flex-1 flex justify-center max-w-md">
        <button className="p-2 text-white hover:text-blue-200 transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div> */}

      {/* Right Section - Notifications and User */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <button className="text-white hover:text-blue-200 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-500 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-xs">
            5
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
          </Avatar>
          <span className="text-white">John Doe</span>
        </div>
      </div>
    </nav>
  );
}
