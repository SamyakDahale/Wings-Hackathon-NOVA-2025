// src/components/admin/OverviewTab.tsx
import { DollarSign, Users, Shield } from "lucide-react";

const overviewCards = [
  { title: "Total Revenue", icon: DollarSign, value: "$1,235,000" },
  { title: "Total Customers", icon: Users, value: "12,345" },
  { title: "Active Policies", icon: Shield, value: "8,765" },
];

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {overviewCards.map((item) => (
        <div
          key={item.title}
          className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:shadow-lg"
        >
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <item.icon className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-900">
            {item.title}
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}