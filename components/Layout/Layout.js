import { Box, Container } from "@chakra-ui/react";

import Header from "@/components/Header";

function Layout(props) {
  return (
    <Box>
      <Header />
      <Container
        paddingTop="56px"
        maxWidth={props.maxWidth}
        height={props.height}
      >
        {props.children}
      </Container>
    </Box>
  );
}

export default Layout;
