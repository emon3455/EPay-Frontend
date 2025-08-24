import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-emerald-900 dark:to-black backdrop-blur-xl min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}
