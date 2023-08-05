



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <div>
        <div>
        {children}
        </div>
    </div>
  )
}
