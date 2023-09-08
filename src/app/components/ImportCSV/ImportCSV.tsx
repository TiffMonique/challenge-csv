'use client'
import { useState } from "react";
import postData from "@/app/api/endpoints/export/postItem";
import { showSuccess } from "@/app/hooks";
import { CsvHeaderProps, ItemProps } from "@/app/interfaces";
import { downloadCSV, parseCSVLine, readFileAsText, validateCSVFormat } from "@/app/utils";
import { Modal } from "..";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";

function ImportCSV() {
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ItemProps[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [insertedCount, setInsertedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("Please select a .csv file");
  const [animation, setAnimation] = useState(false);

  const handleOnChange = (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFile(selectedFile.name);
    }
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
    const selectedFile = e.target.files?.[0];
    e.preventDefault();
    setErrorCount(0);
    setIsLoading(true);

    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFile(selectedFile.name);
    }
    if (!file) {
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 2000);
    };
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
          csvRows.push({ name, phone, email, observations: 'Empty fields found' });
        }
      }


      const sum = countErrors + countMissingFields;
      setInsertedCount(countSuccess);
      setErrorCount(sum);
      if (countErrors > 0 || countMissingFields > 0) {
        setErrorDetails(csvRows);
        setIsModalOpen(true);
      }
      if (countSuccess > 0 && countErrors === 0 && countMissingFields === 0) {
        showSuccess("CSV uploaded successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleDownloadErrors = () => {
    downloadCSV(errorDetails, headers);
    setIsModalOpen(false);
  };

  return (
    <>
      <form className="w-full flex">
        <div
          className={`flex flex-row items-center rounded mr-4 border border-bg-primary ${animation ? "animate-wiggle" : ""}`}
        >
          <input
            type="file"
            id="custom-input"
            onChange={handleOnChange}
            accept=".csv"
            hidden
            required
          />
          <label
            htmlFor="custom-input"
            className={`block mr-4 py-3 px-4 rounded border-0 text-lg font-semibold bg-primary text-white-500 cursor-pointer`}
          >
            Choose file
          </label>
          <label className={`text-sm mr-4  ${animation ? "text-primary" : "text-slate-500"}`}>{selectedFile}</label>
        </div>
        <Button onClick={handleOnSubmit}>
          Import
        </Button>
      </form >


      {
        isLoading ? (
          <Loading />
        ) : null
      }
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Error Summary"
      >
        <div className="pb-6">
          <p>There were {errorCount} errors during the upload. And {insertedCount} contacts were successfully inserted.</p>
          <p>Do you want to download the error details?</p>
        </div>
        <div className="flex pt-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-100"
          >
            No
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleDownloadErrors}
          >
            Yes
          </button>

        </div>
      </Modal>
    </>
  );
}

export default ImportCSV;
