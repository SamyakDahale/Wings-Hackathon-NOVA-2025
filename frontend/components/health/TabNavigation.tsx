// For navigation
interface TabProps {
    tabs: Array<{
      label: string;
      value: string;
      icon: React.ElementType;
    }>;
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  export default function TabNavigation({ tabs, activeTab, setActiveTab }: TabProps) {
    return (
      <div className="flex justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === tab.value
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>
    );
  }