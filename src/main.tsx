import { createRoot } from "react-dom/client"
import App from "./app/App"
import Toaster from "./components/utility/Toast/Toaster"
import "./design/global.css"

createRoot(document.getElementById("root")!).render(<>
  <App />

  <Toaster />
</>)
