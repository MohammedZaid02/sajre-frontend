import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../Store/UseAppStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // 🔹 control visibility
  const [lastScrollY, setLastScrollY] = useState(0);

  const currentUserId = useAppStore((s) => s.currentUserId);
  const userFromStore = useAppStore((s) => s.getById(currentUserId));
  const userLocal = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const user = userFromStore || userLocal;

  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Gallery", path: "/Gallery" },
    { name: "Career", path: "/Career" },
    { name: "Contact", path: "/Contact" },
    { name: "Courses", path: "/Courses" },
  ];

  // 🔹 Handle profile photo upload
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, photo: reader.result };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser._id);
      window.location.reload();
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("pendingUserId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-transparent text-white z-50 backdrop-blur-md transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300"
        >
          Sajre Edutech
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-12 md:flex">
          <ul className="flex gap-8 text-lg">
            {navItems.map((item, index) => (
              <li key={index} className="relative cursor-pointer group font-bold">
                <Link
                  to={item.path}
                  className="hover:text-gray-200 transition-colors"
                >
                  {item.name}
                  {/* Hover underline with bounce */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-bounceLine"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side: Profile or Register */}
          {!user ? (
            <Link to="/register">
              <button className="px-4 py-2 ml-4 font-medium text-black transition bg-white rounded hover:bg-gray-200">
                Get Registered
              </button>
            </Link>
          ) : (
            <div className="relative ml-4">
              <img
                src={user.photo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23ccc'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='14' fill='%23333' text-anchor='middle' dominant-baseline='middle'%3EUser%3C/text%3E%3C/svg%3E"}
                alt="profile"
                className="object-cover border-2 border-white rounded-full w-10 h-10 cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all duration-300"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {showDropdown && (
                <div className="absolute right-0 w-48 mt-2 text-white bg-blue-600 rounded-xl shadow-xl z-50 p-2 animate-fadeIn">
                  {/* <label className="block px-4 py-2 cursor-pointer hover:bg-blue-400 transition-colors rounded">
                    Change Profile
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileUpload}
                    />
                  </label> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-red-400 transition-colors rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#213555]/80 px-6 pb-4 backdrop-blur-lg">
          <ul className="flex flex-col gap-4 text-lg">
            {navItems.map((item, index) => (
              <li key={index} className="relative cursor-pointer group">
                <Link
                  to={item.path}
                  className="hover:text-gray-200 transition-colors"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-bounceLine"></span>
                </Link>
              </li>
            ))}

            {!user ? (
              <Link to="/register">
                <button className="px-4 py-2 mt-2 font-medium text-black transition bg-white rounded hover:bg-gray-200">
                  Get Registered
                </button>
              </Link>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <label className="block px-4 py-2 cursor-pointer bg-blue-600 rounded hover:bg-blue-700 transition text-center text-white">
                  Change Profile
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />
                </label>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-white transition bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}