import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from "@/components/Layout";

function Home() {
  return (
    <Layout maxWidth="container.xl" height="100vh">
      <Flex
        direction="column"
        justifyContent="center"
        height="100%"
        padding="0 16px"
        position="relative"
      >
        <Box>
          <Heading as="h1" size="3xl">
            I'm Kavan,
          </Heading>
          <Text fontSize="3xl">
            a software engineer based in Belfast and Edinburgh.<br/>
            I love building stuff.
          </Text>
          <Box marginTop="30px">
            <Stack
              direction="row"
              marginTop="30px"
              spacing="16px"
              alignItems="center"
            >
              <Link href="https://www.linkedin.com/in/kavan-bickerstaff-46a757133/" isExternal>
                <FontAwesomeIcon icon={["fab", "linkedin"]} width="32px" />
              </Link>
              <Link href="https://github.com/KB9" isExternal>
                <FontAwesomeIcon icon={["fab", "github"]} width="32px" />
              </Link>
              <Link href="mailto:kb@kavanbickerstaff.com" isExternal>
                <FontAwesomeIcon icon="envelope" width="32px" />
              </Link>
            </Stack>
          </Box>
        </Box>
        <Text
          visibility={{ base: "hidden", lg: "visible" }}
          position="absolute"
          bottom="0"
          right="0"
          fontSize="300px" 
          fontWeight="600"
          lineHeight="340px"
          userSelect="none"
        >
          HI
        </Text>
      </Flex>
    </Layout>
  )
}

export default Home;
