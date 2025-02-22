import { Button } from "../../components/ui/button";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({ tabs, activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="mb-12 flex justify-center">
      <div className="inline-flex rounded-md shadow-sm">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            className={`
              ${activeTab === tab ? "bg-purple-600 text-white" : "text-gray-700"}
              hover:bg-purple-600 hover:text-white
              ${tab === "overview" ? "rounded-l-md" : ""}
              ${tab === "lifestyle" ? "rounded-r-md" : ""}
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}