import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md pl-80 p-4 flex justify-between items-center">
      <div className="text-lg font-semibold text-center">APP MENU</div>
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
