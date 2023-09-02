'use client'
import React, { useState } from "react";
import postData from "@/app/api/endpoints/export/postItem";
import { showError, showSuccess } from "@/app/hooks/useNotifications";

function ImportCSV() {
  const [file, setFile] = useState();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const validateCSVFormat = (csvString: any) => {
    const lines = csvString.split("\n");
    const expectedHeaders = ["name", "phone", "email"];

    const lineMatchesHeaders = (line: string) => {
      const normalizedLine = line.toLowerCase();
      return expectedHeaders.every((header) => normalizedLine.includes(header));
    };

    let hasHeaders = false;
    if (lines.length > 0 && lineMatchesHeaders(lines[0])) {
      hasHeaders = true;
    }

    return { lines, hasHeaders };
  };

  const parseCSVLine = (line: any) => {
    const [name, phone, email] = line.split(",").map((field: string) => field.replace(/"/g, ''));
    return { name, phone, email: email?.replace(/\r/g, '') };
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) return;
    try {
      const csvString = await readFileAsText(file);
      const { lines, hasHeaders } = validateCSVFormat(csvString);
      let countSuccess = 0;
      let countErrors = 0;
      let countMissingFields = 0;
      for (const line of lines.slice(hasHeaders ? 1 : 0)) {
        const { name, phone, email } = parseCSVLine(line);
        if (name && phone && email) {
          const data = { name, phone, email };
          const res = await postData(data);
          if (res.message) {
            countSuccess++;
            console.log(res.messagem, 'resmensaej');
          } else {
            countErrors++;
          }
        } else {
          countMissingFields++;
        }
      }

      if (countErrors > 0) {
        showError("Error sending data");
      }
      if (countMissingFields === 1 && countErrors === 0) {
        showError("One line is empty. Please check your CSV file.");
      } else if (countMissingFields > 1) {
        showError("Some lines are missing fields. Please check your CSV file.");
      }
      if (countSuccess > 0 && countErrors === 0 && countMissingFields === 0) {
        showSuccess("CSV uploaded successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const readFileAsText = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const csvOutput = event.target?.result;
        const csvString = String(csvOutput);
        resolve(csvString);
      };
      fileReader.onerror = (event) => {
        reject(event.target?.error);
      };
      fileReader.readAsText(file);
    });
  };


  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={handleOnChange}
        />
        <button type="submit">
          IMPORT CSV
        </button>
      </form>
    </div>
  );
}

export default ImportCSV;
