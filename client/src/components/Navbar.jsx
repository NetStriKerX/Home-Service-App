import { useState } from "react";
import logoHomeService from "/icons/logoHomeService.png";
import userProfile from "/icons/userProfile.png";
import { BsBellFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { TiClipboard } from "react-icons/ti";
import { MdHistory } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";
// import useData from "../hooks/useData";

// Navbar Left Container component
const NavbarLeftContainer = () => {
  return (
    <div className="w-[60%] flex space-x-4 items-center ">
      <div className="flex">
        <img
          className="w-[32px] h-[32px]"
          src={logoHomeService}
          alt="HomeServices Logo"
        />
        <a href="/" className=" text-blue-600 font-medium text-[24px] mx-[5%]">
          HomeServices
        </a>
      </div>
      <Link to="/services" className="text-black text-[16px] pt-1 pl-[5%]">
        บริการของเรา
      </Link>
    </div>
  );
};

//navbar for login at Homepage
export const NavbarLogin = () => {
  return (
    <nav className="relative bg-white py-4 w-screen h-[80px] drop-shadow-[2px_2px_24px_rgba(23,51,106,0.12)] z-10">
      <div className="w-[80%] mx-auto flex justify-between items-center ">
        {/* Left container */}
        <NavbarLeftContainer />

        {/* Right container */}
        <div className="flex w-[40%] justify-end">
          <Link to="/login">
            <button className="btn-secondary">เข้าสู่ระบบ</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// dropdown component for user-afmin profile
const DropdownItem = ({ IconComponent, text, to, toggleDropdown }) => {
  const { toDash } = useAuth();

  return (
    <li>
      <Link
        to={to}
        className="block px-4 py-2 text-gray-600 hover:text-gray-950 hover:bg-gray-100"
        onClick={() => {
          toggleDropdown();
          text === "Admin Dashboard" ? toDash() : null;
        }}
      >
        <IconComponent className="inline-block mr-2 icon-dropdown" />
        {text}
      </Link>
    </li>
  );
};

const Navbar = ({ menuItems }) => {
  const { logout, user } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    logout();
  };
  return (
    <nav className="relative bg-white py-4 w-screen h-[80px] drop-shadow-[2px_2px_24px_rgba(23,51,106,0.12)] z-10">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        {/* Left container */}
        <NavbarLeftContainer />

        {/* Right container */}
        <div className="flex w-[40%]  flex-row justify-end ">
          <div className="flex  justify-between  ">
            <div className="pt-[6px] flex">
              <span
                id="user-name"
                className="text-black pt-1 text-[16px] mx-2 flex text-right"
              >
                {user?.profiles[0].full_name}
              </span>
            </div>

            <div className="relative">
              <BiUser
                className="w-10 h-10 p-2 bg-gray-100 rounded-full mx-2 cursor-pointer text-gray-400 hover:bg-gray-200 duration-300"
                onClick={toggleDropdown}
              />
              {dropdownVisible && (
                <div
                  id="dropdown"
                  className="absolute z-10 right-[6px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                >
                  <ul
                    className="py-2 text-sm text-gray-800 "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {menuItems.map((item, index) => (
                      <DropdownItem
                        key={index}
                        IconComponent={item.IconComponent}
                        text={item.label}
                        to={item.to}
                        toggleDropdown={toggleDropdown}
                      />
                    ))}

                    <li className="my-1 bg-gray-300 h-[1px] "></li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-gray-950 hover:bg-gray-100 "
                        onClick={handleLogout}
                      >
                        <HiOutlineLogout className="inline-block mr-2  icon-dropdown" />
                        ออกจากระบบ
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="w-10 h-10 rounded-full mx-2 cursor-pointer flex justify-center items-center transition-colors duration-300 icon-circle-hover">
              <BsBellFill className="w-4 h-8 text-gray-400 icon transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const NavbarLogout = ({ isAdmin }) => {
  const menuItems = [
    // {
    //   label: "ข้อมูลผู้ใช้งาน",
    //   IconComponent: BiUser,
    //   to: "/user",
    // },
    {
      label: "รายการคำสั่งซ่อม",
      IconComponent: TiClipboard,
      to: "/user-orders-list",
    },
    // {
    //   label: "ประวัติการซ่อม",
    //   IconComponent: MdHistory,
    //   to: "/history",
    // },
    {
      label: "Admin Dashboard",
      IconComponent: MdHistory,
      to: "/categories",
    },
  ];
  if (!isAdmin) menuItems.pop();

  return <Navbar menuItems={menuItems} />;
};

export const AdminNavbarLogout = () => {
  const menuItems = [
    // {
    //   label: "ข้อมูลผู้ใช้งาน",
    //   IconComponent: BiUser,
    //   to: "/user",
    // },
    {
      label: "รายการคำสั่งซ่อม",
      IconComponent: TiClipboard,
      to: "/user-orders-list",
    },
    // {
    //   label: "ประวัติการซ่อม",
    //   IconComponent: MdHistory,
    //   to: "/history",
    // },
    {
      label: "Admin Dashbroad",
      IconComponent: MdHistory,
      to: "/admin-dashboard",
    },
  ];

  return <Navbar menuItems={menuItems} />;
};
