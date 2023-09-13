'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ItemProps } from "@/app/interfaces/Item.interface";
import getData from '@/app/api/endpoints/import/getItem';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';

let PageSize = 10;

const ContactList = () => {
  const [data, setData] = useState<ItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    return data.slice(startIndex, endIndex);
  }, [currentPage, data]);



  useEffect(() => {
    async function fetchData() {
      try {
        const items = await getData();
        setData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="py-1 bg-blueGray-50 flex flex-col items-center">
      <Table data={currentTableData} />
      <div className="xs:pb-14 md:p-0">
        <Pagination
          data={data}
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );

};

export default ContactList;

