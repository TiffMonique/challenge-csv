import { ItemProps } from '@/app/interfaces';
import nofound from '@/app/assets/img/nodatafound.png';
import Image from 'next/image';
import { BsArrowLeftCircle } from 'react-icons/bs';
import Link from 'next/link';

interface TableProps {
  data: ItemProps[];
}

const Table = ({ data }: TableProps) => {
  return (
    <div className="w-full xl:w-8/12 xl:mb-0 px-4 mx-auto xs:pt-20 sm:pt-40">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Image src={nofound} alt="No Data Found Image" className="p-2" />
            <h1 className="xs:text-2xl sm:text-3xl font-medium text-gray-300 mt-1">No contacts to show.</h1>
            <div className="flex text-center my-5 p-2 cursor-pointer">
              <Link href="/" className="flex items-center animate-pulse animate-infinite animate-ease-in">
                <BsArrowLeftCircle className="text-primary text-3xl mr-2" />
                <h2 className="text-lg font-semibold">Import Contacts</h2>
              </Link>
            </div>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Phone
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: ItemProps, index: number) => (
                  <tr key={index}>
                    <th className="px-6 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {item.name}
                    </th>
                    <td className="px-6 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.phone}
                    </td>
                    <td className="px-6 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
