import { AnimatePresence } from "framer-motion"
import { FC, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Storage from "./api/storage"
import Private from "./components/layout/Private"
import Public from "./components/layout/Public"
import Window from "./components/layout/Window"
import AnimatedRoutes from "./lib/router/AnimatedRoutes"
import { useAuthorizationSlice } from "./stores/authorization"
import WinAddPassphrase from "./windows/(add-passphrase)/WinAddPassphrase"
import WinLogin from "./windows/(auth)/WinLogin"
import WinRegister from "./windows/(auth)/WinRegister"
import WinDashboard from "./windows/(dashboard)/WinDashboard"
import WinPassphraseDetails from "./windows/(passphrases)/[id]/WinPassphraseDetails"
import WinPassphrases from "./windows/(passphrases)/WinPassphrases"

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
                  { path: "/add-passphrase", element: <WinAddPassphrase /> },
                  { path: "/actions-and-news", element: <Window> Actions </Window> },
                  { path: "/settings", element: <Window> Settings </Window> },
                  { path: "/passphrases/:id", element: <WinPassphraseDetails /> },
                  /**
                   * { path: "/actions/fix-common", element: <WinFixCommon /> },
                   * { path: "/actions/fix-common/:id", element: <WinFixCommonDetail /> },
                   * { path: "/actions/fix-strength", element: <WinFixStrength /> },
                   * { path: "/actions/fix-strength/:id", element: <WinFixStrengthDetail /> },
                   * { path: "/settings/data", element: <WinSettingsData /> },
                   */
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