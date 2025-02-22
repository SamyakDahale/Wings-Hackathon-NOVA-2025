// src/pages/admin-dashboard.tsx
import React from "react";
import TabNavigation from "../components/admin/TabNavigation";
import OverviewTab from "../components/admin/OverviewTab";
import InsurancesTab from "../components/admin/InsurancesTab";
import AddInsuranceTab from "../components/admin/AddInsuranceTab";
import LifestyleFactorsTab from "../components/admin/LifestyleFactorsTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState("overview");

  const tabs = ["overview", "insurances", "add", "lifestyle"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Insurance Admin Dashboard
        </h1>

        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "insurances" && <InsurancesTab />}
        {activeTab === "add" && <AddInsuranceTab />}
        {activeTab === "lifestyle" && <LifestyleFactorsTab />}
      </div>
    </div>
  );
}