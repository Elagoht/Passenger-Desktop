import React from "react"
import { Outlet, useLocation } from "react-router-dom"

const AnimatedRoutes: React.FC = () =>
  <Outlet key={useLocation().pathname} />

export default AnimatedRoutes