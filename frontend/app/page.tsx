"use client";

import { useState } from "react";

interface Order {
  id: number;
  customer: string;
  item: string;
  status: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customer: "Rahul", item: "Pizza", status: "Pending" },
    { id: 2, customer: "Sneha", item: "Burger", status: "Preparing" },
    { id: 3, customer: "Amit", item: "Pasta", status: "Delivered" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newItem, setNewItem] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.item.toLowerCase().includes(search.toLowerCase())
  );

  const addOrder = () => {
    if (!newCustomer || !newItem) return;

    const newOrder: Order = {
      id: orders.length + 1,
      customer: newCustomer,
      item: newItem,
      status: "Pending",
    };

    setOrders([...orders, newOrder]);
    setNewCustomer("");
    setNewItem("");
    setShowModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Preparing":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">DishDash</h1>
        <div className="space-x-6">
          <button className="hover:text-blue-600">Home</button>
          <button className="hover:text-blue-600">Orders</button>
          <button className="hover:text-blue-600">About</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-4xl font-bold mb-2">
          Manage Your Food Orders Smartly
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Efficient. Fast. Reliable.
        </p>

        {/* Search + Add Button */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search orders..."
            className="border p-2 rounded w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Order
          </button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-4/5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {order.customer}
              </h3>
              <p className="text-gray-600 mb-3">{order.item}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Add New Order</h3>

            <input
              type="text"
              placeholder="Customer Name"
              className="w-full border p-2 mb-3 rounded"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
            />

            <input
              type="text"
              placeholder="Food Item"
              className="w-full border p-2 mb-4 rounded"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={addOrder}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}