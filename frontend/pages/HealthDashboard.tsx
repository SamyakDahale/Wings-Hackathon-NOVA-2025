// src/pages/healthDashboard.tsx
import React, { useState } from "react";
import UploadDocs from "../components/health/UploadDocs";
import LabReports from "../components/health/LabReports";
import ManualEntry from "../components/health/ManualEntry";
import LifestyleForm from "../components/health/LifestyleForm";
import TabNavigation from "../components/health/TabNavigation";
import SumValue from "../components/health/SumValue";
import { Upload, FileCheck, ClipboardList, Dumbbell } from "lucide-react";

export function HealthDashboard() {
  const [activeTab, setActiveTab] = useState<string>("upload");

  const tabs = [
    { label: "Upload Docs", value: "upload", icon: Upload },
    { label: "Lab-Reports", value: "reupload", icon: FileCheck },
    { label: "Manual Entry", value: "manual", icon: ClipboardList },
    { label: "Lifestyle", value: "lifestyle", icon: Dumbbell },
    { label: "Sum Value", value: "SumValue", icon: ClipboardList }, 
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Health Profile Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Lorem welcome
        </p>
      </div>

      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "upload" && <UploadDocs />}
      {activeTab === "reupload" && <LabReports />}
      {activeTab === "manual" && <ManualEntry />}
      {activeTab === "SumValue" && <SumValue />}
      {activeTab === "lifestyle" && <LifestyleForm />}
    </div>
  );
}
