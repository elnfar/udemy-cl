import { User } from "@prisma/client"
import { userConstant } from "@/app"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface UserMenuProps {
    currentUser: User | null
    closeUserMenu: () => void
}
;


export default function MainMenu({currentUser,closeUserMenu}:UserMenuProps) {
    const router = useRouter()


    if(!currentUser) return
    
  return (
    <div className={`
    flex flex-col h-[50vh shadow-lg right-0 rounded-lg px-4 py-2 gap-6 border-2 
    `}>
        <div className="flex items-center gap-4">

                    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer" onClick={() => router.push('/user')}>
                                <img src={currentUser.avatar || ''} alt="profile-image" className="rounded-full"/>
                    </div>

                    <div className="flex flex-col">
                        <span>{currentUser.name}</span>
                        <span className="text-gray-400">{currentUser.email}</span>
                    </div>
                
        </div>

        <div className="flex flex-col gap-3 font-light">
            {userConstant.map((item) => (
                <div key={item.name} onClick={closeUserMenu}>
                    <Link href={item.link}>{item.name}</Link>
                </div>
            ))}
        </div>

        <div className="border-black border-[1px] p-2 mt-auto">
           <button onClick={() => signOut()}>Sign out</button>
        </div>
    </div>
  )
}
