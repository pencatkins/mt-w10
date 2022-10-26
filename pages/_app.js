//import from Chakra UI API library
import { ChakraProvider } from "@chakra-ui/react";
//import Auth from "../components/Auth";
import Header from "../components/Header";

//create/define UI for MyApp
function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider>
    <Header />
    <Component {...pageProps} />
  </ChakraProvider>);
  }
  
  export default MyApp;
