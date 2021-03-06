import Head from "next/head";
import Link from "next/link";
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react"

import Layout from "../components/Layout";

function Home() {
  return (
    <>
      <Head>
        <title>Kavan Bickerstaff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <HStack spacing="30px">
                <Link href="/about">
                  <Text fontWeight="bold" cursor="pointer" textDecoration="underline">
                    LEARN MORE ABOUT ME
                  </Text>
                </Link>
                <Link href="/contact">
                  <Text fontWeight="bold" cursor="pointer" textDecoration="underline">
                    GET IN TOUCH
                  </Text>
                </Link>
              </HStack>
            </Box>
          </Box>
          <Text
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
    </>
  )
}

export default Home;