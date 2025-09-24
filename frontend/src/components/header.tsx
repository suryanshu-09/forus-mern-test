import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteUser = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (confirmDelete && user) {
      try {
        const response = await axios.delete("/api/users", {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          alert("Account deleted successfully");
          localStorage.clear();
          navigate("/");
        } else {
          alert("Error deleting account");
        }
      } catch {
        alert("Error deleting account");
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="m-4 p-2 px-6 flex items-center justify-between bg-white rounded-lg relative">
      <div>
        <img src={Logo} alt="logo" className="size-16 inline" />
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IoIosMenu size={24} />
        </button>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                  {user?.name || "User"}
                </div>

                <button
                  onClick={handleDeleteUser}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <RiDeleteBin6Line size={16} />
                  Delete Account
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <IoIosLogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
