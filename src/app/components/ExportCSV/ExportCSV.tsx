'use client'
import { CSVLink } from 'react-csv';
import { ItemProps } from '@/app/interfaces/Item.interface';
import { BiExport } from 'react-icons/bi';
import { showMessage } from "@/app/hooks";
import { useEffect, useState } from 'react';
import getData from '@/app/api/endpoints/import/getItem';

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
    showMessage("No contacts to export. Import contacts from CSV file.");
  }

  return (
    <>
      {csvData.length > 0 ? (
        <CSVLink {...csvLink} className='font-medium tracking-wide py-2 px-5 sm:px-8 border border-primary text-primary bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-secondary hover:text-white-500 transition-all hover:shadow-purple flex items-center'>
          <BiExport className='inline-block mr-2' />
          Export CSV
        </CSVLink>
      ) : (
        <button className='font-medium tracking-wide py-2 px-5 sm:px-8 border border-primary text-primary bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-secondary hover:text-white-500 transition-all hover:shadow-purple flex items-center' onClick={handleExportClick}>
          <BiExport className='inline-block mr-2' />
          Export CSV
        </button>
      )}
    </>
  )
}

export default ExportCSV;
