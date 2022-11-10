import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import WalletContextProvider from '../components/WalletContextProvider'

function MyApp({ Component, pageProps }: AppProps) {

  const colours = {
    background: "#1F1F1F",
    accent: "#833BBE",
    bodyText: "rgba(255, 255, 255, 0.75)",
  }

  const theme = extendTheme({ colours });

  return (
    <ChakraProvider theme={theme}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
