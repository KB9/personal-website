import Link from 'next/link';
import { Box, Container, Flex, HStack } from "@chakra-ui/react";

function Header() {
  return (
    <Box width="100%" height="56px" position="fixed">
      <Container maxWidth="container.xl">
        <Flex padding="16px" fontWeight="bold">
          <Box flex="1">
            <Link href="/">Kavan Bickerstaff</Link>
          </Box>
          <HStack spacing="24px">
            <Link href="/blog">Blog</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;