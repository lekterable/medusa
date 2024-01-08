import { Toaster } from "@medusajs/ui"
import { MedusaProvider } from "medusa-react"

import { AuthProvider } from "./providers/auth-provider"
import { RouterProvider } from "./providers/router-provider"
import { ThemeProvider } from "./providers/theme-provider"

import { queryClient } from "./lib/medusa"

const MEDUSA_BACKEND_URL =
  import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"

function App() {
  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </MedusaProvider>
  )
}

export default App
