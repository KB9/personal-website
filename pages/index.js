import Head from 'next/head'

import { Center, VStack, Heading, Text } from "@chakra-ui/react"

function Home() {
  return (
    <div>
      <Head>
        <title>Kavan Bickerstaff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center w="100vw" h="100vh">
        <VStack>
          <Heading>Kavan Bickerstaff</Heading>
          <Text>Site coming soon!</Text>
        </VStack>
      </Center>
    </div>
  )
}

export default Home;