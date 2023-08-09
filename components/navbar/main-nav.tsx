'use client'

import { Course, User } from "@prisma/client";
import Link from "next/link"
import { FormEvent, useState } from "react";
import MainMenu from "./main-menu";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from 'query-string'
import {ShoppingCartIcon} from 'lucide-react'
import Image from "next/image";
import { ToggleTheme } from "../toggle-theme";

interface UserMenuProps {
    user:User | null;
}

export default function Navbar({user}:UserMenuProps) {

    const [userMenuOpen,setUserMenuOpen] = useState(false)
    const [searchQuery,setSearchQuery] = useState('')

    const router = useRouter();
    const params = useSearchParams();

    const closeUserMenu = () => {
        setUserMenuOpen(false)
    }

    const onSearch = (e:FormEvent) => {
        e.preventDefault();

        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery:any = {
            ...currentQuery,
            result:searchQuery
        }

        const url = qs.stringifyUrl({
            url:'/',
            query: updatedQuery
        }, {skipNull:true})
        router.push(`/${url}`)
    }

  return (
    <div className=" border-b-2">
        <div className="p-3 px-4">
            <div className="flex items-center justify-between gap-2">
                <nav className="flex items-center gap-6 flex-1 relative">
                    <Link href='/'><h1 className="text-[1.4rem]">ILearn</h1></Link>



                    <form className="lg:flex-1 lg:flex hidden" onSubmit={onSearch}>
                        <input type="text" 
                        placeholder="Search for anything ..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="
                        w-full p-3 font-light bg-white rounded-full border-black border-[1px] outline-none
                        "
                        />
                    </form>
                </nav>


                <div className="items-center gap-4 text-[.8rem] px-2 hidden lg:flex">
                    <ToggleTheme/>
                    <div>
                        <a href={user ?  "/new-course" : '/login'}>Teach on ILearn</a>
                    </div>

                    <div className="relative">
                       <Link href='/basket'><ShoppingCartIcon className='h-6 w-10'/></Link>
                        <div className="absolute -right-1 -bottom-2 bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center text-white">
                          {user?.basketIds.length === 0 ? 0 : user?.basketIds.length}
                        </div>
                    </div>
                </div>


                <div className="flex items-center gap-3">
                    {!user && (
                        <>
                            <div>
                              <Link href='/api/auth/signin' className='py-2 px-6 border-black border-[1px]'>Login</Link>
                            </div>

                            <div>
                               <Link href='/api/auth/signin' className='py-2 px-6 bg-black text-white border-[1px] border-black '>Sign up</Link>
                            </div>
                        </>
                    )}

                    {user && (
                        <div className=" rounded-full bg-black flex items-center justify-center text-white cursor-pointer" onClick={() => setUserMenuOpen(prev => !prev)}>
                            <Image src={user.avatar || ''} alt="Image"  width={40} height={40} className="rounded-full"/>
                        </div>
                    )}


                    {userMenuOpen && (
                        <div className="absolute bottom-0 top-20 right-20">
                            <MainMenu
                                currentUser={user}
                                closeUserMenu={closeUserMenu}
                            />
                        </div>
                    )}

                </div>

            </div>
        </div>
    </div>
  )
}
