import { AnimatePresence } from "framer-motion"
import { FC, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Storage from "../api/storage"
import Private from "../components/layout/Private"
import Public from "../components/layout/Public"
import Window from "../components/layout/Window"
import AnimatedRoutes from "../lib/router/AnimatedRoutes"
import { useAuthorizationSlice } from "../lib/stores/authorization"
import WinAddPassphrase from "./add-passphrase/WinAddPassphrase"
import WinLogin from "./auth/WinLogin"
import WinRegister from "./auth/WinRegister"
import WinDashboard from "./dashboard/WinDashboard"
import WinPassphraseDetails from "./passphrases/[id]/WinPassphraseDetails"
import WinPassphrases from "./passphrases/WinPassphrases"
import WinSettings from "./settings/WinSettings"
import WinConstantPairs from "./settings/constant-pairs/WinConstantPairs"
import WinConstantPairForm from "./settings/constant-pairs/[key]/WinConstantPairForm"
import WinNewConstantPair from "./settings/constant-pairs/new-constant-pair/WinNewConstantPair"
import WinImportFromBrowser from "./settings/import-from-browser/WinImportFromBrowser"
import WinExportToCSV from "./settings/export-to-csv/WinExportToCSV"
import WinDetective from "./detective/WinDetective"

export const settings = new Storage(".settings.dat")

const App: FC = () => {
  const isAuthorized = useAuthorizationSlice((state) => state.isAuthorized)
  const setIsGuideDone = useAuthorizationSlice((state) => state.setIsGuideDone)

  useEffect(() => {
    (async () => setIsGuideDone(
      await settings.read("isGuideDone") === "true"
    ))()
  }, [])

  return <BrowserRouter>
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Routes>
          <Route element={<Public />}>
            <Route element={<AnimatedRoutes />}>
              {[
                { path: "/auth/login", element: <WinLogin /> },
                { path: "/auth/register", element: <WinRegister /> },
                // { path: "/auth/reset-password", element: <ResetPassword /> }
              ].map((route, index) =>
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
                {[
                  { path: "/dashboard", element: <WinDashboard /> },
                  { path: "/passphrases", element: <WinPassphrases /> },
                  { path: "/passphrases/:id", element: <WinPassphraseDetails /> },
                  { path: "/add-passphrase", element: <WinAddPassphrase /> },
                  { path: "/detective", element: <WinDetective /> },
                  { path: "/settings", element: <WinSettings /> },
                  { path: "/settings/constant-pairs", element: <WinConstantPairs /> },
                  { path: "/settings/constant-pairs/:key", element: <WinConstantPairForm /> },
                  { path: "/settings/new-constant-pair", element: <WinNewConstantPair /> },
                  { path: "/settings/import-from-browser", element: <WinImportFromBrowser /> },
                  { path: "/settings/export-to-csv", element: <WinExportToCSV /> },
                  { path: "*", element: <Window>404 Not Found</Window> }
                ].map((route, index) =>
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

export default App