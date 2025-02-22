// Lifestyle form 
import { useState } from "react";
import axios, { AxiosError } from "axios";

const frequencyOptions = [ // for bad habits u have to inverse them for good habits
  { value: 0, label: "Never" },
  { value: 1, label: "Rarely" },
  { value: 2, label: "Occasionally" },
  { value: 3, label: "Frequently" },
  { value: 4, label: "Very Frequently" },
  { value: 5, label: "Always" },
];



export default function LifestyleForm() {
  const [lifestyle, setLifestyle] = useState({
    exercise: 0,
    smoking: 0,
    drinking: 0,
    jobHazard: 0,
    mentalStress: 0,
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [response, setResponse] = useState<{ weightedAverage: number } | null>(null);

  const sendDataToAPI = async () => {
    try {
      const {...numericValues } = lifestyle;
      const res = await axios.post<{ weightedAverage: number }>(
        "http://localhost:5001/lifestyle",
        numericValues
      );
      setResponse(res.data);
      setApiError(null);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setApiError(err.response?.data.message || "Server Error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        {Object.entries(lifestyle).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            {key === "bmi" ? (
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                value={value}
                onChange={(e) =>
                  setLifestyle((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ) : (
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                value={value}
                onChange={(e) =>
                  setLifestyle((prev) => ({
                    ...prev,
                    [key]: parseInt(e.target.value),
                  }))
                }
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={sendDataToAPI}
        className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        Submit
      </button>

      {/* Response Message */}
      {response && (
        <div className="mt-4 bg-green-100 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900">Result</h3>
          <p className="text-green-700">
            Weighted Average: {response.weightedAverage}
          </p>
        </div>
      )}

      {/* Error Message */}
      {apiError && (
        <div className="mt-4 bg-red-100 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900">Error</h3>
          <p className="text-red-700">{apiError}</p>
        </div>
      )}
    </div>
  );
}