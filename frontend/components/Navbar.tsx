export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center bg-white/80 backdrop-blur border-b border-[#daa520]/20">
      <h1 className="text-xl font-bold tracking-wide text-[#daa520]">
        DishDash
      </h1>

      <div className="text-sm text-[#8b7b7b]">
        Compare • Save • Order
      </div>
    </nav>
  );
}