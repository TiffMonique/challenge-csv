'use client'
import { CSVLink } from 'react-csv';
import { useEffect, useState } from "react";
import { ItemProps } from '@/app/interfaces/Item.interface';
import getData from '@/app/api/endpoints/import/getItem';
import { BiExport } from 'react-icons/bi';
import { showError } from "@/app/hooks";

const ExportCSV = () => {
  const [csvData, setCvsData] = useState<ItemProps[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setCvsData(data)
    })
  }, []);

  const headers = [
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
    }
  ]
  const csv = csvData.map(item => ({
    name: item.name,
    phone: item.phone,
    email: item.email
  }));
  const csvLink = {
    filename: 'contacts-list.csv',
    headers: headers,
    data: csv
  }

  const handleExportClick = () => {
    if (csvData.length === 0) {
      showError("No contacts to export.");
    }
  }

  return (
    <CSVLink {...csvLink} className='font-medium tracking-wide py-2 px-5 sm:px-8 border border-primary text-primary bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-primary hover:text-white-500 transition-all hover:shadow-purple flex items-center' onClick={handleExportClick}>
      <BiExport className='inline-block mr-2' />
      Export CSV
    </CSVLink>
  )
}

export default ExportCSV;
