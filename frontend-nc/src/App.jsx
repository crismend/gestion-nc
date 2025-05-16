import AppRoutes from "./routes/Routes"
import { Toaster } from "react-hot-toast"

export default function App() {

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </>

  )
}