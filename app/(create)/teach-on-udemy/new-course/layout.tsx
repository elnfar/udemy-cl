
import { getUserSession } from '@/lib/auth'



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user =  await getUserSession();
  
  return (
    <div>
        <div>
        {children}
        </div>
    </div>
  )
}
