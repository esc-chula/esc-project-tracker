import Navbar from "../../components/navbar/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Navbar />
        {children}
      </div>
    </>
  )
}
