import React from "react"
import { Outlet, useLocation } from "react-router-dom"

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return <Outlet key={location.pathname} />
}

export default AnimatedRoutes