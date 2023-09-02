'use client'
import { ToastContainer } from "react-toastify";
import ExportCSV from "./components/ExportCSV/ExportCSV";
import ImportCSV from "./components/ImportCSV/ImportCSV";
import 'react-toastify/dist/ReactToastify.css';

function Page() {

  return (
    <div>
      <ExportCSV />
      <ImportCSV />
      <ToastContainer
      />
    </div>
  );
}

export default Page;
