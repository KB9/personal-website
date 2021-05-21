import Head from "next/head";
import {
  Box,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import Layout from "../../components/Layout";

import Blog from "../../services/blog";

const mdComponents = {
  a: ({node, ...props}) => (
    <Link
      href={props.href}
      color="#319795"
      isExternal
    >
      {props.children}
    </Link>
  ),
  blockquote: ({node, ...props}) => (
    <Box
      borderLeft=".25em solid"
      borderLeftColor="gray.500"
      paddingLeft="1em"
      paddingRight="1em"
      marginBottom="16px"
      color="gray.500"
    >
      {props.children}
    </Box>
  ),
  code: ({node, ...props}) => (
    <Text
      as="kbd"
      padding={props.inline ? ".2em .4em" : "0px"}
      borderRadius={props.inline ? "6px" : "0px"}
      bg={props.inline ? "rgb(237, 242, 247)" : null}
    >
      {props.children}
    </Text>
  ),
  em: ({node, ...props}) => <Text as="em">{props.children}</Text>,
  h1: ({node, ...props}) => (
    <Heading
      as="h1"
      size="xl"
      marginTop="24px"
      marginBottom="16px"
    >
      {props.children}
    </Heading>
  ),
  h2: ({node, ...props}) => (
    <Heading
      as="h2"
      size="lg"
      marginTop="24px"
      marginBottom="16px"
    >
      {props.children}
    </Heading>
  ),
  h3: ({node, ...props}) => (
    <Heading
      as="h3"
      size="md"
      marginTop="24px"
      marginBottom="16px"
    >
      {props.children}
    </Heading>
  ),
  h4: ({node, ...props}) => (
    <Heading
      as="h4"
      size="sm"
      marginTop="24px"
      marginBottom="16px"
    >
      {props.children}
    </Heading>
  ),
  h5: ({node, ...props}) => (
    <Heading
      as="h5"
      size="sm"
      marginTop="24px"
      marginBottom="16px"
    >
      {props.children}
    </Heading>
  ),
  h6: ({node, ...props}) => (
    <Heading
      as="h6"
      size="sm"
      marginTop="24px"
      marginBottom="16px"
    >
      {props.children}
    </Heading>
  ),
  hr: ({node, ...props}) => <Divider m="24px 0" />,
  img: ({node, ...props}) => <Image title={props.title} src={props.src} />,
  li: ({node, ...props}) => (
    <ListItem marginTop={props.index > 0 ? ".25em" : "0px"}>
      {props.children}
    </ListItem>
  ),
  ol: ({node, ...props}) => (
    <OrderedList
      marginBottom={props.depth === 0 ? "16px" : "0px"}
      marginLeft="2em"
    >
      {props.children}
    </OrderedList>
  ),
  p: ({node, ...props}) => <Text marginBottom="16px">{props.children}</Text>,
  pre: ({node, ...props}) => (
    <Box
      bg="rgb(237, 242, 247)"
      borderRadius="6px"
      p={props.inline ? ".2em .4em" : "16px"}
      mb="16px"
      whiteSpace="pre"
    >
      {props.children}
    </Box>
  ),
  strong: ({node, ...props}) => <Text as="b" mb="16px">{props.children}</Text>,
  ul: ({node, ...props}) => (
    <UnorderedList
      marginBottom={props.depth === 0 ? "16px" : "0px"}
      marginLeft="2em"
    >
      {props.children}
    </UnorderedList>
  )
};

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
        <ReactMarkdown components={mdComponents}>
          {props.blogPost.content}
        </ReactMarkdown>
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
