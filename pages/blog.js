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
          title="Coming Soon"
          text="The first blog post will arrive shortly."
          timestamp="March 6, 2020"
        />
      </Stack>
    </Layout>
    </>
  );
}

export default BlogPage;