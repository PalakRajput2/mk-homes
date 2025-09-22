import Link from "next/link";
import { FaNewspaper, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { FaPeopleGroup, FaStaffSnake } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="bg-white shadow-md pl-80 p-4 flex justify-between items-center">
      <div className="flex items-center justify=center  text-center gap-6 ">
        <p className="text-lg font-semibold">APP MENU</p>

        <Link href="/portal/staff" className="flex gap-3 items-center justify-center cursor-pointer ">
        < FaPeopleGroup className="text-xl" />   
         <p className="text-gray-600">Staff</p>
         </Link>



        <Link href="/portal/staff" className="flex  items-center justify-center gap-3 cursor-pointer">
          < FaTasks className="text-lg" />
          <p className="text-gray-600">Tasks</p>
        </Link>



        <Link href="/portal/staff" className="flex  items-center justify-center gap-3  cursor-pointer">
        < FaNewspaper className="text-lg" />
         <p className="text-gray-600">Project Management</p>
        </Link>
       



      </div>
      <div className="flex items-center space-x-6 text-sm mr-10">
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
