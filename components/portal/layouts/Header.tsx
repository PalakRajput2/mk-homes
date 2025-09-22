import Link from "next/link";
import { FaNewspaper, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { FaPeopleGroup, FaStaffSnake } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="bg-white shadow-md pl-80 p-4 flex justify-between items-center">
      <div className="flex  text-center gap-5 "><p className="text-lg font-semibold">APP MENU</p>
        <div className="flex  items-center justify-center gap-3">
          <Link href="/portal/staff">< FaPeopleGroup /></Link>
          <p>Staff</p>
        </div>
           <div className="flex  items-center justify-center gap-3">
          <Link href="/portal/staff">< FaTasks /></Link>
          <p>Tasks</p>
        </div>
           <div className="flex  items-center justify-center gap-3">
          <Link href="/portal/staff">< FaNewspaper /></Link>
          <p>Project Management</p>
        </div>
        
        
        </div>
      <div className="flex items-center space-x-6 text-sm">
        <button

          className="flex transform items-center text-[#F01E2C] transition-all duration-200 ease-in-out hover:scale-105 hover:text-red-800 cursor-pointer p-2">

          <FaSignOutAlt className="mr-2 h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
