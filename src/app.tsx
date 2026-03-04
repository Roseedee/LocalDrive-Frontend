import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import "./shared/styles/global.css"

import { AppInitializer } from "./app/AppInitializer"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppInitializer>
    <RouterProvider router={router} />
  </AppInitializer>
)