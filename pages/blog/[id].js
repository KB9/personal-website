import Head from "next/head";
import { Heading, Text } from "@chakra-ui/react";

import Layout from "../../components/Layout";

import Blog from "../../services/blog";

function BlogPost(props) {
  return (
    <>
      <Head>
        <title>{props.blogPost.title} | Kavan Bickerstaff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout maxWidth="container.md">
        <Heading mb="1">{props.blogPost.title}</Heading>
        <Text mb="1">{props.blogPost.subtitle}</Text>
        <Text mb="6">{props.blogPost.timestamp}</Text>
        <Text>{props.blogPost.content}</Text>
      </Layout>
    </>
  )
}

export default BlogPost;

export async function getStaticProps(context) {
  const postId = context.params.id;
  const metadata = await Blog.getBlogPostMetadata(postId);
  const content = await Blog.getBlogPostContent(postId);

  const blogPost = {
    ...metadata,
    content
  };

  return {
    props: {
      blogPost
    }
  }
}

export async function getStaticPaths() {
  const blogPostList = await Blog.getBlogPostList();
  const paths = blogPostList.map(post => ({
    params: {
      id: post.url
    }
  }));
  return {
    paths,
    fallback: false
  };
}
