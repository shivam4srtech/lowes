'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import ResponsiveRender from './ResponsiveRender';
import { IoMenuOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

import StoreSearch from './StoreSearch'
export default function Header({href}){
    const pathname = usePathname();
    const defautNavClasses = "border-solid border-[#fff]  border-b-[2px] h-[65px] flex items-center px-[5px] text-[#7c828f] font-[400] text-[16px] uppercase"
    return(
        <>
           <header className="items-center flex flex-row justify-between px-[20px] md:px-[40px] shadow-xs">
               <ResponsiveRender breakpoint={768}
                 mobile={
                    <>
                       <div className="menu_icon">
                           <button><IoMenuOutline/></button>
                       </div>
                    </>
                 }
               />
                <div className="flex items-center gap-4">
                    <div className="logo">
                      <Image
                          src={'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'}
                          width={50}
                          height={50}
                          alt="logo"
                      />
                    </div>
                    <ResponsiveRender breakpoint={768}
                       
                        desktop={
                            <>
                                <ul className="navLinks flex item-center items-center gap-5">
                                    <li className="h-[100%] flex items-center">
                                        <Link href={'/'} className={`${defautNavClasses} ${pathname === "/" ? "active" : ''}`} >Home</Link>
                                    </li>
                                    <li>
                                        <Link href={'/category'} className={`${defautNavClasses} ${pathname === "/category" ? "active" : ''}`} >Category</Link>
                                    </li>
                                    <li>
                                        <Link href={'/store'} className={`${defautNavClasses} ${pathname === "/store" ? "active" : ''}`} >Store</Link>
                                    </li>
                                </ul>
                            </>
                        }
                    />
                </div>
                <ResponsiveRender breakpoint={768}
                    mobile={
                        <>
                           <button><GoSearch/></button>
                        </>
                    }
                    desktop={
                        <>
                            <div className="flex items-center">
                                <StoreSearch/>
                            </div>
                        </>
                    }
                />
                
           </header>
        </>
    );
}