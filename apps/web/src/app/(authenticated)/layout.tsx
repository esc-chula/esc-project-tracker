import { Toaster } from "@/src/components/alert/toaster";
import Navbar from "../../components/navbar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Navbar />
        {children}
        <Toaster />
      </div>
    </>
  );
}
