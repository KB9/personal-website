import Head from "next/head";
import { Box, Heading, Stack } from "@chakra-ui/react";

import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  return (
    <>
    <Head>
      <title>Blog | Kavan Bickerstaff</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout maxWidth="container.md">
      <Heading as="h1" marginTop="10">Blog</Heading>
      <Stack direction="column" marginTop="6" spacing="4">
        <BlogCard
          title="Modelling the Jindosh Riddle as a Boolean Satisfiability Problem"
          text="Solving any version of the Jindosh Riddle from the video game Dishonored 2."
          timestamp="May 20, 2021"
          link="/blog/jindosh-riddle-solver"
        />
      </Stack>
    </Layout>
    </>
  );
}

export default BlogPage;
