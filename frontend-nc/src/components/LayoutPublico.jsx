import logo from "../assets/LogoRequena.png"

export default function LayoutPublico({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header con logo y título */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-center px-4 py-4 gap-3">
          <img src={logo} alt="Logo Siderúrgica Requena" className="h-12 w-auto" />
          <h1 className="text-lg sm:text-xl font-semibold text-blue-800 tracking-tight">
            Gestión de No Conformidades
          </h1>
        </div>
      </header>

      {/* Contenido principal centrado */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
          {children}
        </div>
      </main>

      {/* Footer profesional */}
      <footer className="bg-gray-100 border-t border-gray-200 py-3">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Siderúrgica Requena, S.A.U.
        </div>
      </footer>
    </div>
  )
}
