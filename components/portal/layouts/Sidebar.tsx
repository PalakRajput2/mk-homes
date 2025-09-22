'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaClipboardList,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaMicrophone,
  FaHandshake,
} from "react-icons/fa";
import { FaCheckToSlot, FaHandHoldingHand, FaHandshakeSimple } from "react-icons/fa6";

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, route: "/" },
    {
      name: "CMS",
      icon: <FaCheckToSlot />,
      route: "/portal/query",
      items: [
        { name: 'Pages', route: '/portal/quotation' },
        { name: 'Menus', route: '/portal/contact-us' },
        { name: 'Hero Slider', route: '/portal/contact-us' },
        { name: 'Global Block', route: '/portal/contact-us' },
         { name: 'Blogs', route: '/portal/contact-us' },
      ]
    },
    { name: "Services", icon: <FaMicrophone />, route: "/portal/services" },
    { name: "Projects", icon: <FaProjectDiagram />, route: "/portal/project" },
    { name: "Partners", icon: <FaHandshakeSimple />, route: "/portal/partners" },
    { name: "Testimonials", icon: <FaStar />, route: "/portal/testimonials" },
    { name: "Team", icon: <FaUsers />, route: "/portal/team" },
    {
      name: "Query",
      icon: <FaClipboardList />,
      route: "/portal/query",
      items: [
        { name: 'Quotation', route: '/portal/quotation' },
        { name: 'Contact Us', route: '/portal/contact-us' },
      ]
    },
    { name: "Settings", icon: <FaCog />, route: "/portal/settings" },
  ];

  return (
    <div className="w-66 shadow-md h-screen fixed overflow-auto bg-gray-100">
      <div className="p-6 text-3xl border-b border-gray-200 font-mono  bg-white">MK Homes</div>
       <p className="px-5 font-semibold mt-4"> Web Menu</p>
      <nav className=" ml-2 "> 
        {menuItems.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between gap-3  p-2 rounded text-gray-600 hover:bg-red-100 cursor-pointer">
            
              <Link
                href={item.route}
                className={`flex items-center gap-3 flex-1 p-2 rounded ${pathname === item.route
                    ? "bg-red-500 text-white font-semibold"
                    : "text-gray-600"
                  }`}
              >
               <span className="text-[22px] hover:text-[25px]"> {item.icon}</span>
                {item.name}
              </Link>


              {item.items && (
                <button onClick={() => toggleMenu(item.name)}>
                  {openMenus.includes(item.name) ? (
                    <FaChevronUp className="text-red-400 cursor-pointer " />
                  ) : (
                    <FaChevronDown className="text-red-400 cursor-pointer mr-3" />
                  )}
                </button>
              )}
            </div>

            {item.items && openMenus.includes(item.name) && (
              <div className="ml-6">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.route}
                    className={`block p-3 text-sm hover:text-red-500 border-l border-gray-300 pl-6 ${pathname === subItem.route ? "bg-gray-200 font-semibold" : ""
                      }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
