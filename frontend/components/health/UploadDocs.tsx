// 1st tab to upload diagnosis report 

import { useFileUpload } from "../hooks/useFileUpload";
import { Upload, FileCheck } from "lucide-react";

export default function UploadDocs() {
  const { files, error, extractedText, matchedKeyword, handleFileUpload } = useFileUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      await handleFileUpload(e.target.files[0], "http://localhost:8001/upload/");
    }
  }; 

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* File upload UI */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 mx-auto text-purple-600 mb-4" />
        <p className="text-gray-600 mb-2">DIAGNOSIS Drag and drop your medical reports here</p>
        <p className="text-gray-500 text-sm mb-4">Supported formats: PDF, JPG, PNG</p>
        <label className="bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
          Browse Files
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Display uploaded files and extracted text */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Uploaded File</h4>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg">
            <FileCheck className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-gray-700">{files[0].name}</span>
          </div>
        </div>
      )}

      {extractedText && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800">Extracted Text</h4>
          <p className="text-gray-700">{extractedText}</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4">Matched Keyword</h4>
          <p className="text-gray-700">{matchedKeyword}</p>
        </div>
      )}
    </div>
  );
}