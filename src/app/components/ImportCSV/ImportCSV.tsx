import React, { useState } from "react";
import postData from "@/app/api/endpoints/export/postItem";
import { showError, showSuccess } from "@/app/hooks/useNotifications";
import { CsvHeaderProps } from "@/app/interfaces";
import { downloadCSV, parseCSVLine, readFileAsText, validateCSVFormat } from "@/app/utils";

function ImportCSV() {
  const [file, setFile] = useState();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const headers: CsvHeaderProps[] = [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Phone',
      key: 'phone'
    },
    {
      label: 'Email',
      key: 'email'
    },
    {
      label: 'Observations',
      key: 'observations'
    }
  ]
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) return;
    try {
      const csvString = await readFileAsText(file);
      const { lines, hasHeaders } = validateCSVFormat(csvString);

      let countSuccess = 0;
      let countErrors = 0;
      let countMissingFields = 0;
      let csvRows = [];

      for (const line of lines.slice(hasHeaders ? 1 : 0)) {
        const { name, phone, email } = parseCSVLine(line);
        if (name && phone && email) {
          const data = { name, phone, email };
          const res = await postData(data);

          if (res.message) {
            countSuccess++;
            csvRows.push({ ...data, observations: res.message });
          } else {
            countErrors++;
            csvRows.push({ ...data, observations: res.error });
          }
        } else {
          countMissingFields++;
          csvRows.push({ name, phone, email, observations: 'Missing Fields' });
        }
      }

      if (countErrors > 0) {
        showError("Error sending data");
        downloadCSV(csvRows, headers);
      }
      if (countMissingFields === 1 && countErrors === 0) {
        showError("One line is empty. Please check your CSV file.");
        downloadCSV(csvRows, headers);
      } else if (countMissingFields > 1) {
        showError("Some lines are missing fields. Please check your CSV file.");
        downloadCSV(csvRows, headers);
      }
      if (countSuccess > 0 && countErrors === 0 && countMissingFields === 0) {
        showSuccess("CSV uploaded successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
