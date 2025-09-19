import { CryptoContextProvider } from "./context/crypto-context"
import AppLayout from "./components/layout/AppLayout/AppLayout"

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
