import { useState } from "react";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function SumValue() {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [userInput, setUserInput] = useState({
    age: "",
    annualIncome: "",
    policyValue: "",
  });

  const handleChange = (key: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponseMessage("");
    try {
      const requestData = {
        age: Number(userInput.age) || 0,
        annualIncome: Number(userInput.annualIncome) || 0,
        policyValue: Number(userInput.policyValue) || 0,
      };

      const response = await axios.post("http://localhost:8010/SumValue", requestData);
      setResponseMessage(`Calculated Value: ${response.data.sumAssured}`);
    } catch (error) {
      setResponseMessage("Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Details</h2>
      <div className="space-y-4">
        {Object.entries(userInput).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {responseMessage && (
        <Alert className="mt-6 bg-gray-50 border-l-4 border-green-500 shadow-md">
          <ShieldAlert className="h-5 w-5 text-green-500" />
          <AlertTitle className="text-green-600">Result</AlertTitle>
          <AlertDescription className="text-gray-800">{responseMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
