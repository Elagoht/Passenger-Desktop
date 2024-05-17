import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./global.css"
import Toaster from "./components/utilities/Toaster"

createRoot(document.getElementById("root")!)
  .render(
    <StrictMode>
      <App />

      <Toaster />
    </StrictMode>
  )
