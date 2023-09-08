'use client'
import React, { useEffect, useState } from 'react';
import { ItemProps } from "@/app/interfaces/Item.interface";
import getData from '@/app/api/endpoints/import/getItem';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';

const ContactList = () => {
  const [data, setData] = useState<ItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

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

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = data.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(data.length / contactsPerPage)) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="py-1 bg-blueGray-50 flex flex-col items-center">
      <Table data={currentContacts} />
      <Pagination
        data={data}
        currentPage={currentPage}
        paginate={paginate}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        contactsPerPage={contactsPerPage}
        indexOfFirstContact={indexOfFirstContact}
        indexOfLastContact={indexOfLastContact}
      />
    </div>
  );
};

export default ContactList;
