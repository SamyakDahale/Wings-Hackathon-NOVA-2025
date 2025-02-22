import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

// Define the expected structure of an insurance plan
type InsurancePlan = {
  existd: string;
  predictd: string;
  budget: number;
  addon: string;
  healths: string;
  descc: string;
};

export default function InsurancesTab() {
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);

  useEffect(() => {
    const fetchInsurancePlans = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3002/api/insurance/getByAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log("Fetched Plans:", result);
        if (response.ok) {
          setInsurancePlans(result.plans);
          console.log("Insurance Plans Updated:", result.plans);
        } else {
          alert("Failed to fetch insurance plans: " + result.message);
        }
      } catch (err) {
        console.error("Error:", err);
        alert("An error occurred while fetching insurance plans.");
      }
    };

    fetchInsurancePlans();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-900">Existing Disease</TableHead>
            <TableHead className="text-gray-900">Predicted Disease</TableHead>
            <TableHead className="text-gray-900">Premium amount per 10L SA</TableHead>
            <TableHead className="text-gray-900">Addon</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insurancePlans.length > 0 ? (
            insurancePlans.map((plan, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{plan.existd}</TableCell>
                <TableCell>{plan.predictd}</TableCell>
                <TableCell>₹{plan.budget}</TableCell>
                <TableCell>{plan.addon}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No insurance plans found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
