'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExportCSV } from "..";
import headerNavLinks from "@/app/data/HeaderNavLinks";
import { AiFillHome } from 'react-icons/ai';
import { BiSolidContact } from "react-icons/bi";
import { usePathname } from 'next/navigation'


const Header = () => {
  const pathname = usePathname()

  const [activeLink, setActiveLink] = useState(pathname);
  // Inicializamos el estado de enlace activo

  useEffect(() => {
    // Actualiza el enlace activo cuando cambia la ruta
    setActiveLink(pathname);
  }, [pathname]);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 bg-white-500 transition-all"
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            {/* Aquí puedes agregar contenido o logotipo para la barra de navegación */}
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-gray-900 items-center">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                passHref
                className={`hidden sm:block font-medium text-gray-900 ${link.href === activeLink ? 'text-primary border-b-2 border-primary' : ''}`}
                onClick={() => setActiveLink(link.href)} // Actualiza el enlace activo cuando se hace clic
              >
                {link.title}

              </Link>
            ))}
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <ExportCSV />
          </div>
        </nav>
      </header>

      {/* Barra de navegación para dispositivos móviles */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 purple-t">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <Link href={"/"} passHref className={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ${activeLink === '/' ? 'text-purple-500 border-purple-500' : ''}`}
              onClick={() => setActiveLink('/')}
            >
              <AiFillHome className="text-xl" />
              Home

            </Link>
            <Link href={"/contactsList"} passHref className={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ${activeLink === '/contactsList' ? 'text-purple-500 border-purple-500' : ''}`}
              onClick={() => setActiveLink('/contactsList')}
            >
              <BiSolidContact className="text-xl" />
              Contacts
            </Link>
          </ul>
        </div>
      </nav >
    </>
  );
};

export default Header;
