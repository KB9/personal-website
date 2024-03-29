import { Heading, Stack } from "@chakra-ui/react";

import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";

import Blog from "@/services/blog";

function BlogHomePage(props) {

  const blogPostLinks = props.blogPostList.map(blogPost => {
    return (
      <BlogCard
        key={blogPost.url}
        title={blogPost.title}
        text={blogPost.subtitle}
        timestamp={blogPost.timestamp}
        link={`/blog/${blogPost.url}`}
      />
    );
  });

  return (
    <Layout title="Blog" maxWidth="container.md" height="100vh">
      <Heading as="h1" marginTop="10">Blog</Heading>
      <Stack direction="column" marginTop="6" spacing="4">
        {blogPostLinks}
      </Stack>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const blogPostList = await Blog.getBlogPostList();
  return {
    props: {
      blogPostList
    }
  };
}

export default BlogHomePage;
