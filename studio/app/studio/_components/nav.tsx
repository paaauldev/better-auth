export const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          <li className="py-4 text-sm text-gray-500 hover:text-gray-700">
            Overview
          </li>
          <li className="py-4 text-sm font-medium text-gray-900 border-b-2 border-stone-600">
            Users
          </li>
          <li className="py-4 text-sm text-gray-500 hover:text-gray-700">
            Organizations
          </li>
          <li className="py-4 text-sm text-gray-500 hover:text-gray-700">
            Configure
          </li>
        </ul>
      </div>
    </nav>
  );
};
