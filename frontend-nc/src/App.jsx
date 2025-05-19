import { useEffect } from "react";
import AppRoutes from "./routes/Routes"
import { Toaster } from "react-hot-toast"

export default function App() {
  console.log("👉 API usada:", import.meta.env.VITE_API_URL);
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </>

  )
}