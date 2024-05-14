import { FC, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Private from "./components/layout/Private"
import Public from "./components/layout/Public"
import WinLogin from "./components/windows/(auth)/WinLogin"
import { useAuthorizationSlice } from "./stores/authorization"
import AnimatedRoutes from "./lib/router/AnimatedRoutes"
import Window from "./components/layout/Window"
import { AnimatePresence } from "framer-motion"
import WinDashboard from "./components/windows/(dashboard)/WinDashboard"

const App: FC = () => {
  const isAuthorized = useAuthorizationSlice((state) => state.isAuthorized)

  return <BrowserRouter>
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Routes>
          <Route element={<Public />}>
            <Route element={<AnimatedRoutes />}>
              {[
                { path: "/auth/login", element: <WinLogin /> },
                /**
                 * { path: "/auth/register", element: <WinRegister /> },
                 * { path: "/auth/reset-password", element: <ResetPassword /> }
                 */
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
                  { path: "/passphrases", element: <Window> Passphrases </Window> },
                  { path: "/add-passphrase", element: <Window> Add Passphrase </Window> },
                  { path: "/actions-and-news", element: <Window> Actions </Window> },
                  { path: "/settings", element: <Window> Settings </Window> },
                  /**
                   * { path: "/auth/register", element: <WinRegister /> },
                   * { path: "/auth/reset-password", element: <WinResetPassword /> },
                   * { path: "/passphrases/:id", element: <WinPassphraseDetail /> },
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