import { useEffect, useState } from "react";
import Link from 'next/link';
import { Box, Container, Flex, HStack } from "@chakra-ui/react";

function Header() {
  const [headerShadow, setHeaderShadow] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHeaderShadow("0 3px 5px rgba(57, 63, 72, 0.3)");
    } else {
      setHeaderShadow(null);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <Box
      width="100%"
      height="56px"
      position="fixed"
      bg="white"
      zIndex="999"
      boxShadow={headerShadow}
    >
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
