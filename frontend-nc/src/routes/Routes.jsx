import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import ListadoInformesNC from "../pages/NoConformidades/ListadoInformesNC"
import RegistroInformeNC from "../pages/NoConformidades/RegistroInformeNC"
import RegistroInformeAccion from "../pages/Acciones/RegistroInformeAccion"
import PrivateRoute from "./PrivateRoute"
import ListadoAcciones from "../pages/Acciones/ListadoAcciones"
import DetalleInformeNC from "../pages/NoConformidades/DetalleInformeNC"
import Dashboard from "../pages/Dashboard"
import LayoutPrivado from "../components/LayoutPrivado"
import LayoutPublico from "../components/LayoutPublico"
import DetalleInformeAccion from "../pages/Acciones/DetalleInformeAccion"



export default function AppRoutes() {
  return (
    <Routes>
      {/* Login (sin layout ni navbar) */}
      <Route
        path="/"
        element={
          <LayoutPublico>
            <LoginPage />
          </LayoutPublico>
        } />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* No Conformidades (PSM-03-I-03) */}
      <Route
        path="/noconformidades"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <ListadoInformesNC />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />
      <Route
        path="/noconformidades/nueva"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <RegistroInformeNC />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />
      <Route
        path="/noconformidades/:id/editar"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <RegistroInformeNC />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />

      {/* Acciones Correctivas/Preventivas (PSM-03-I-05) */}
      <Route
        path="/acciones"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <ListadoAcciones />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />
      <Route
        path="/acciones/nueva"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <RegistroInformeAccion />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />
      <Route
        path="/acciones/:id/editar"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <RegistroInformeAccion />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />

      <Route
        path="/noconformidades/:id/ver"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <DetalleInformeNC />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />

      <Route
        path="/acciones/:id/ver"
        element={
          <PrivateRoute>
            <LayoutPrivado>
              <DetalleInformeAccion />
            </LayoutPrivado>
          </PrivateRoute>
        }
      />


    </Routes>
  )
}
