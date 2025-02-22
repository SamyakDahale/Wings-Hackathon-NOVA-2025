import { useState } from "react";
import { Activity, Cigarette, Beer, Briefcase, Brain } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const initialFactors = [
  { name: "Exercise", icon: Activity, value: "" },
  { name: "Smoking", icon: Cigarette, value: "" },
  { name: "Drinking", icon: Beer, value: "" },
  { name: "Job Hazard", icon: Briefcase, value: "" },
  { name: "Mental Stress", icon: Brain, value: "" },
];

export default function LifestyleFactorsTab() {
  const [factors, setFactors] = useState(initialFactors);

  const handleChange = (index: number, value: string) => {
    const updatedFactors = [...factors];
    updatedFactors[index].value = value;
    setFactors(updatedFactors);
  };

  const handleLifestyleSubmit = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
  
    const lifestyleData = {
      exercise: Number(factors.find(f => f.name === "Exercise")?.value || 0),
      smoking: Number(factors.find(f => f.name === "Smoking")?.value || 0),
      drinking: Number(factors.find(f => f.name === "Drinking")?.value || 0),
      job_hazard: Number(factors.find(f => f.name === "Job Hazard")?.value || 0),
      mental_stress: Number(factors.find(f => f.name === "Mental Stress")?.value || 0),
    };
  
    // Check for missing values
    for (let key in lifestyleData) {
      if (lifestyleData[key as keyof typeof lifestyleData] === 0) {
        alert(`${key.replace("_", " ")} is required and cannot be zero.`);
        return;
      }
    }
  
    try {
      const response = await fetch("http://localhost:3003/api/lifestyle/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(lifestyleData), // Send as object
      });
  
      console.log("Sending lifestyle factors:", lifestyleData);
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("Error response:", result);
        throw new Error(result.message || "Failed to save lifestyle data");
      }
  
      console.log("Success:", result);
      alert("Lifestyle factors saved successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while saving lifestyle factors.");
    }
  };
  

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Lifestyle Factors
      </h2>
      <p className="text-gray-600 mb-6">
        Set the percentage impact of lifestyle factors on insurance premiums
      </p>
      <div className="space-y-6">
        {factors.map((factor, index) => (
          <div key={factor.name} className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <factor.icon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-grow">
              <label
                htmlFor={factor.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {factor.name}
              </label>
              <div className="flex items-center">
                <Input
                  type="number"
                  id={factor.name}
                  min="0"
                  max="100"
                  placeholder="Enter percentage"
                  className="w-full"
                  value={factor.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                <span className="ml-2 text-gray-600">%</span>
              </div>
            </div>
          </div>
        ))}
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
          onClick={handleLifestyleSubmit}
        >
          Save Lifestyle Factors
        </Button>
      </div>
    </div>
  );
}
