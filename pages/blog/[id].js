import Head from "next/head";
import NextImage from "next/image";
import { useRouter } from "next/router";
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
import RemarkMathPlugin from "remark-math";
import Katex from "rehype-katex";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import cpp from 'react-syntax-highlighter/dist/cjs/languages/hljs/cpp';
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import vs from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs';

import Layout from "@/components/Layout";
import JindoshGrid from "@/components/JindoshGrid";

import Blog from "@/services/blog";

import "katex/dist/katex.min.css";

// Register languages as required
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage("js", js);

const preBackground = "rgb(240, 240, 240)";

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
  code: ({node, ...props}) => {
    if (props.className === "language-jindosh-grid") {
      const data = JSON.parse(props.children);
      return <JindoshGrid {...data} />;
    }

    const match = /language-(\w+)/.exec(props.className || "");
    return !props.inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={vs}
        PreTag="div"
        children={String(props.children).replace(/\n$/, '')}
        customStyle={{ background: preBackground }}
        {...props}
      />
    ) : (
      <Text
        as="kbd"
        padding={props.inline ? ".2em .4em" : "0px"}
        borderRadius={props.inline ? "6px" : "0px"}
        bg={props.inline ? preBackground : null}
      >
        {props.children}
      </Text>
    )
  },
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
      bg={preBackground}
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

const mdPlugins = [
  RemarkMathPlugin
];

const rehypePlugins = [
  Katex
];

function BlogPost(props) {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  // Path to optimized next/image (w = width, q = quality)
  const canonicalImagePath = `${websiteUrl}/_next/image?url=${encodeURIComponent(props.blogPost.imagePath)}&w=1200&q=75`;
  const router = useRouter();
  const canonicalUrl = `${websiteUrl}${router.asPath}`;
  return (
    <>
      <Head>
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={canonicalImagePath} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content={props.blogPost.subtitle} />
      </Head>
      <Layout title={props.blogPost.title} maxWidth="container.md" strictTitle>
        <Heading mb="1">{props.blogPost.title}</Heading>
        <Text mb="1">{props.blogPost.subtitle}</Text>
        <Text>{props.blogPost.timestamp}</Text>
        <Box p="30px 0px">
          <NextImage src={props.blogPost.imagePath} width={1200} height={630} />
        </Box>
        <ReactMarkdown
          components={mdComponents}
          plugins={mdPlugins}
          rehypePlugins={rehypePlugins}
        >
          {props.blogPost.content}
        </ReactMarkdown>
      </Layout>
    </>
  );
}

export default BlogPost;

export async function getStaticProps(context) {
  const postId = context.params.id;
  const metadata = await Blog.getBlogPostMetadata(postId);
  const imagePath = await Blog.getBlogPostImagePath(postId);
  const content = await Blog.getBlogPostContent(postId);

  const blogPost = {
    ...metadata,
    imagePath,
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
