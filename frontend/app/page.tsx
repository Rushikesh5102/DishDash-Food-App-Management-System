export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">DishDash</h1>
        <div className="space-x-6">
          <button className="hover:text-blue-600">Home</button>
          <button className="hover:text-blue-600">Menu</button>
          <button className="hover:text-blue-600">About</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-24">
        <h2 className="text-4xl font-bold mb-4">
          Manage Your Food Orders Smartly
        </h2>
        <p className="text-gray-600 text-lg">
          Efficient. Fast. Reliable.
        </p>
      </div>

    </div>
  );
}