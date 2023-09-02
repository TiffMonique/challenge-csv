'use client'
import { CSVLink } from 'react-csv';
import { useEffect, useState } from "react";
import { ItemProps } from '@/app/interfaces/Item.interface';
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
    filename: 'data.csv',
    headers: headers,
    data: csv
  }

  return (
    <CSVLink {...csvLink}>Download CSV</CSVLink>
  )
}

export default ExportCSV