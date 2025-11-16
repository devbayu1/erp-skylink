import type { TabType } from "../../types/customerDetail";

interface CustomerTabsProps {
  activeTab: TabType;
  onTabChange?: (tab: TabType) => void;
}

const tabs: { label: string; value: TabType }[] = [
  { label: "Overview", value: "overview" },
  { label: "Documents", value: "documents" },
  { label: "Order History", value: "order-history" },
  { label: "Communications", value: "communications" },
  { label: "Activity Log", value: "activity-log" },
];

export function CustomerTabs({ activeTab, onTabChange }: CustomerTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange?.(tab.value)}
            className={`pb-3 relative transition-colors ${
              activeTab === tab.value
                ? "text-[#3b82f6]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
