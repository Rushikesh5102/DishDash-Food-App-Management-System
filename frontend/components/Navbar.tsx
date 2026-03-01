export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center bg-black/40 backdrop-blur border-b border-white/10">
      <h1 className="text-xl font-bold tracking-wide text-emerald-400">
        DishDash
      </h1>

      <div className="text-sm text-gray-400">
        Compare • Save • Order
      </div>
    </nav>
  );
}