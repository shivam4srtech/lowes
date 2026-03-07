'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import ResponsiveRender from './ResponsiveRender';
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

import StoreSearch from './StoreSearch';
import { useState, useRef, useEffect  } from "react";
export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const pathname = usePathname();
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
        if (
            searchRef.current &&
            !searchRef.current.contains(event.target)
        ) {
            setShowSearch(false);
        }
        }

        if (showSearch) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    },[isOpen, showSearch]);
    const defautNavClasses = "border-solid border-[#f0f3fe]  border-b-[2px] h-[65px] flex items-center px-[5px] text-[#7c828f] font-[400] text-[16px] uppercase"
    return(
        <>
          
            <header className="h-[50px] min-h-fit items-center flex flex-row justify-between px-[20px] md:px-[40px] shadow-xs relative bg-[#f0f3fe]">
               <ResponsiveRender breakpoint={768}
                mobile={
                    <>
                       <div className="menu_icon">
                           <button
                                aria-label="menu"
                                onClick={() => {setIsOpen(true); setShowSearch(false);}}
                            >
                            <IoMenuOutline size={26}/>
                            </button>
                       </div>
                    </>
                 }
               />
                <div className="flex items-center gap-4">
                    <div className="logo">
                        <Link href="/">
                            <Image
                                src={'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'}
                                width={50}
                                height={50}
                                alt="logo"
                                className="h-auto"
                                loading="eager"
                            />
                        </Link>
                    </div>
                    <ul className="navLinks flex item-center items-center gap-5 desktop_nav_links">
                        <li className="flex items-center">
                            <Link href={'/'} className={`${defautNavClasses} ${pathname === "/" ? "active" : ''}`} >Home</Link>
                        </li>
                        <li className="flex items-center">
                            <Link href={'/products'} className={`${defautNavClasses} ${pathname === "/products" ? "active" : ''}`} >Product</Link>
                        </li>
                        <li className="flex items-center">
                            <Link href={'/stores'} className={`${defautNavClasses} ${pathname === "/stores" ? "active" : ''}`} >Stores</Link>
                        </li>
                    </ul>
                </div>
                <ResponsiveRender breakpoint={768}
                    mobile={
                        <>
                            <div ref={searchRef} className="refWrapper">
                                <div>
                                    { showSearch? (<button onClick={()=>setShowSearch(false) } className="search_btn"><IoCloseOutline size={24} /></button>): (<button className="search_btn" onClick={()=>setShowSearch(true)}><GoSearch size={24}/></button>)}
                                </div>
                                { showSearch? 
                                (
                                    <div className="absolute top-[52px] left-[0]  w-[100%] bg-[#fff]  mobile_search p-4">
                                        <div className="m-auto">
                                            <StoreSearch/>
                                        </div>
                                    </div>
                                )
                                :
                                ( 
                                ""
                                )
                                }
                            </div>    
                        </>
                    }
                    desktop={
                        <>
                            <div className="flex items-center w-[380px]">
                                <div className="w-[100%]">
                                        <StoreSearch/>
                                </div>
                            </div>
                        </>
                    }
                />
                <ResponsiveRender breakpoint={768}
                    mobile={
                        <>
                           
                           
                            {/* ===== Overlay ===== */}
                            <div
                                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                                }`}
                                onClick={() => setIsOpen(false)}
                            />
                            {/* ===== Offcanvas Sidebar ===== */}
                            <div
                                    className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
                                    isOpen ? "translate-x-0" : "-translate-x-full"
                                    }`}
                                >
                                {/* Close Button */}
                                <div className="flex justify-end p-4 border-b">
                                <button onClick={() => setIsOpen(false)}>
                                    <IoCloseOutline size={26} />
                                </button>
                                </div>

                                {/* Mobile Nav Links */}
                                <ul className="flex flex-col">
                                <li>
                                    <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className={`${defautNavClasses} ${
                                        pathname === "/" ? "active" : ""
                                    }`}
                                    >
                                    Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                    href="/category"
                                    onClick={() => setIsOpen(false)}
                                    className={`${defautNavClasses} ${
                                        pathname === "/category" ? "active" : ""
                                    }`}
                                    >
                                    Category
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                    href="/stores"
                                    onClick={() => setIsOpen(false)}
                                    className={`${defautNavClasses} ${
                                        pathname === "/stores" ? "active" : ""
                                    }`}
                                    >
                                    Store
                                    </Link>
                                </li>
                                </ul>
                            </div>
                        </>
                    }
                />  
            </header>
        </>
    );
}