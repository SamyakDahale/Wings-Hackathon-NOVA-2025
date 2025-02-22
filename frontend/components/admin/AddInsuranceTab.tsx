import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const formFields = [
  {
    name: "name",
    label: "Insurance Plan Name",
    type: "text",
    placeholder: "Insurance Plan Name",
  },
  {
    name: "existd",
    label: "Enlist Disease",
    type: "select",
    options: ["None", "Asthma", "Cancer", "HIV", "Tuberculosis", "Parkinsons"],
  },
  {
    name: "predictd",
    label: "Predicted Disease",
    type: "select",
    options: ["None", "Fit", "Anemia", "Diabetes", "Hypertension", "High_Cholesterol"],
  },
  {
    name: "budget",
    label: "Premium",
    type: "number",
    placeholder: "Enter Premium amount per 10L SA",
  },
  {
    name: "addon",
    label: "Addon",
    type: "select",
    options: ["None", "Maternity Cover", "OPD & Consultation Cover", "Accidental Cover", "Hospital Cash Rider", "Worldwide Treatment Cover"],
  },
  {
    name: "healths",
    label: "Health Score",
    type: "number",
    placeholder: "Enter health score",
  },
  {
    name: "descc",
    label: "Description",
    type: "text",
    placeholder: "Enter Description",
  },
];

export default function AddInsuranceTab() {
  const [formData, setFormData] = useState({
    name: "",
    existd: "None",
    predictd: "None",
    budget: "",
    addon: "None",
    healths: "",
    descc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const token = localStorage.getItem("adminToken"); 
    console.log("Token:", token); 
    if (!token) {
        alert("Authentication token missing. Please log in again.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3002/api/insurance/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Insurance plan added successfully!");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error adding insurance:", error);
    }
};

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Add New Insurance Plan
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                className="mt-1 block w-full border-gray-300 rounded-md"
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                className="mt-1"
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-5 w-5 mr-2" />
          Add Insurance Plan
        </Button>
      </form>
    </div>
  );
}
