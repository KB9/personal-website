import { ChakraProvider } from "@chakra-ui/react";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCode } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEnvelope, faCode);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
