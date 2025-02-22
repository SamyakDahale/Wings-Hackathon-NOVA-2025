

import { useFileUpload } from "../hooks/useFileUpload";
import { FileCheck, AlertTriangle } from "lucide-react";

export default function LabReports() {
  const { files, error, extractedText, handleFileUpload } = useFileUpload();

  const handleReupload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Please upload only PDF, DOCX, JPG, or PNG files");
    }

    await handleFileUpload(file, "http://localhost:8002/extract/");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <FileCheck className="w-12 h-12 mx-auto text-purple-600 mb-4" />
      <p className="text-gray-600 mb-2">
        Re-upload your medical documents
      </p>
      <p className="text-gray-500 text-sm mb-4">
        Supported formats: PDF, DOCX, JPG, PNG
      </p>
      <label className="bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
        Browse Files
        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx,.jpg,.png"
          onChange={handleReupload}
        />
      </label>
    </div>

    {/* Display Extracted Data */}
    {extractedText && (
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Extracted Medical Values
        </h3>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Test Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(
              JSON.parse(extractedText)?.extracted_values || {},
            ).map(([key, value]) => (
              <tr key={key} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {key}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display Predicted Disease in an Alert Manner */}
        {JSON.parse(extractedText)?.model_prediction
          ?.disease_prediction && (
          <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg shadow-md flex items-center animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">
                ⚠ Possible Disease Detected
              </h3>
              <p className="text-xl font-bold">
                {
                  JSON.parse(extractedText)?.model_prediction
                    ?.disease_prediction
                }
              </p>
            </div>
          </div>
        )}
      </div>
    )}

    {/* Display Error if any */}
    {error && (
      <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg shadow-md flex items-center animate-pulse">
        <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
        <p className="font-semibold">{error}</p>
      </div>
    )}
  </div>
      )}
    
   