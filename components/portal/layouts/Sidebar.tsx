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
} from "react-icons/fa";
import { FaHandHoldingHand } from "react-icons/fa6";

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
    { name: "Services", icon: <FaMicrophone />, route: "/services" },
    { name: "Projects", icon: <FaProjectDiagram />, route: "/projects" },
    { name: "Partners", icon: <FaHandHoldingHand />, route: "/partners" },
    { name: "Testimonials", icon: <FaStar />, route: "/testimonials" },
    { name: "Team", icon: <FaUsers />, route: "/portal/team" },
    {
      name: "Query",
      icon: <FaClipboardList />,
      route: "/query",
      items: [
        { name: 'Quotation', route: '/portal/quotation' },
        { name: 'Contact Us', route: '/portal/contact-us' },
      ]
    },
    { name: "Settings", icon: <FaCog />, route: "/settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen fixed overflow-auto">
      <div className="p-6 text-3xl border-b  font-mono">MK Homes</div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between p-4 text-gray-600 hover:bg-red-100 cursor-pointer">
              <Link
                href={item.route}
                className={`flex items-center gap-3 ${
                  pathname === item.route ? "font-semibold" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>

              {item.items && (
                <button onClick={() => toggleMenu(item.name)}>
                  {openMenus.includes(item.name) ? (
                    <FaChevronUp className="text-red-400 cursor-pointer" />
                  ) : (
                    <FaChevronDown className="text-red-400 cursor-pointer" />
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
                    className={`block p-2 text-sm hover:bg-gray-100 border-l border-gray-500 pl-3 ${
                      pathname === subItem.route ? "bg-gray-200 font-semibold" : ""
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
