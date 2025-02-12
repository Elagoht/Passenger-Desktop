import { AnimatePresence } from "framer-motion"
import { FC, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Private from "../components/layout/Private"
import Public from "../components/layout/Public"
import Window from "../components/layout/Window"
import AnimatedRoutes from "../lib/router/AnimatedRoutes"
import WinAddPassphrase from "./add-passphrase/WinAddPassphrase"
import WinLogin from "./auth/WinLogin"
import WinRegister from "./auth/WinRegister"
import WinDashboard from "./dashboard/WinDashboard"
import WinDetective from "./detective/WinDetective"
import WinPassphrases from "./passphrases/WinPassphrases"
import WinPassphraseDetails from "./passphrases/[id]/WinPassphraseDetails"
import WinSettings from "./settings/WinSettings"
import WinExportToCSV from "./settings/export-to-csv/WinExportToCSV"
import WinImportFromBrowser from "./settings/import-from-browser/WinImportFromBrowser"
import WinResetMasterPassphrase from "./settings/reset-master-passphrase/WinResetMasterPassphrase"
import { authStore } from "@/lib/stores/authorization"

const App: FC = () => {
  const { isAuthorized } = authStore()

  return <BrowserRouter>
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Routes>
          <Route element={<Public />}>
            <Route element={<AnimatedRoutes />}>
              {publicRoutes.map((route, index) =>
                <Route
                  key={index}
                  path={route.path}
                  element={!isAuthorized
                    ? route.element
                    : <Navigate replace to="/dashboard" />
                  }
                />
              )}
            </Route>

            <Route element={<Private />}>
              <Route element={<AnimatedRoutes />}>
                {privateRoutes.map((route, index) =>
                  <Route
                    key={index}
                    path={route.path}
                    element={isAuthorized
                      ? route.element
                      : <Navigate replace to="/auth/login" />
                    }
                  />
                )}
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  </BrowserRouter>
}

const publicRoutes = [
  {
    path: "/auth/login",
    element: <WinLogin />
  }, {
    path: "/auth/register",
    element: <WinRegister />
  }
]

const privateRoutes = [
  {
    path: "/dashboard",
    element: <WinDashboard />
  }, {
    path: "/passphrases",
    element: <WinPassphrases />
  }, {
    path: "/passphrases/:id",
    element: <WinPassphraseDetails />
  }, {
    path: "/add-passphrase",
    element: <WinAddPassphrase />
  }, {
    path: "/detective",
    element: <WinDetective />
  }, {
    path: "/settings",
    element: <WinSettings />
  }, {
    path: "/settings/import-from-browser",
    element: <WinImportFromBrowser />
  }, {
    path: "/settings/export-to-csv",
    element: <WinExportToCSV />
  }, {
    path: "/settings/reset-master-passphrase",
    element: <WinResetMasterPassphrase />
  }, {
    path: "*",
    element: <Window>404 Not Found</Window>
  }
]

export default App