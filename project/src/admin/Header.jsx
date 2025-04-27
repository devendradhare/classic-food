import { LogOut } from "lucide-react";

const Header = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
      <button
        onClick={onLogout}
        className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </button>
    </div>
  );
};

export default Header;