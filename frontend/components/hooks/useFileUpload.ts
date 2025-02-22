import { useState } from "react";
import axios from "axios";

export function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [matchedKeyword, setMatchedKeyword] = useState<string>("");

  const handleFileUpload = async (file: File, endpoint: string) => {
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setExtractedText(response.data.extracted_text || JSON.stringify(response.data, null, 2));
      setMatchedKeyword(response.data.matched_keyword || "");
      setFiles([file]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to process file");
      throw err;
    }
  };

  return {
    files,
    error,
    extractedText,
    matchedKeyword,
    handleFileUpload,
    setError,
  };
}