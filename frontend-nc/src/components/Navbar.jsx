import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { LogOut, Menu, X, User2 } from "lucide-react"
import logo from "../assets/LogoRequena.png"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo + Empresa */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo Siderúrgica Requena" className="h-12 w-auto" />
          <span className="text-lg sm:text-xl font-semibold text-blue-800 tracking-tight">
            Siderúrgica Requena
          </span>
        </div>

        {/* Opciones escritorio */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User2 size={16} />
            <span>{user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-red-700 border border-red-200 bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>

        {/* Menú hamburguesa móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User2 size={16} />
            <span>{user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  )
}
