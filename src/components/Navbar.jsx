function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Revenue & Risk Dashboard
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Admin User</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
