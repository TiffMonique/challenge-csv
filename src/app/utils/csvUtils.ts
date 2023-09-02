import { CsvHeaderProps } from "../interfaces";

export const readFileAsText = (file: any): Promise<string> => {
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

export const validateCSVFormat = (csvString: any) => {
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

export const parseCSVLine = (line: any) => {
  const [name, phone, email] = line.split(",").map((field: string) => field.replace(/"/g, ''));
  return { name, phone, email: email?.replace(/\r/g, '') };
};

export const downloadCSV = (data: any[], csvHeaders: CsvHeaderProps[]) => {
  const csvContent = "data:text/csv;charset=utf-8," +
    csvHeaders.map(header => header.label).join(",") +
    "\n" +
    data.map((row: any) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "imported_data_with_errors.csv");
  document.body.appendChild(link);
  link.click();
};