import Head from "next/head";
import {
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
  a: ({node, ...props}) => <Link href={props.href}>{props.children}</Link>,
  // blockquote: TODO,
  // code: TODO,
  em: ({node, ...props}) => <Text as="em">{props.children}</Text>,
  h1: ({node, ...props}) => <Heading as="h1" size="xl">{props.children}</Heading>,
  h2: ({node, ...props}) => <Heading as="h2" size="lg">{props.children}</Heading>,
  h3: ({node, ...props}) => <Heading as="h3" size="md">{props.children}</Heading>,
  h4: ({node, ...props}) => <Heading as="h4" size="sm">{props.children}</Heading>,
  h5: ({node, ...props}) => <Heading as="h5" size="sm">{props.children}</Heading>,
  h6: ({node, ...props}) => <Heading as="h6" size="sm">{props.children}</Heading>,
  hr: ({node, ...props}) => <Divider />,
  img: ({node, ...props}) => <Image title={props.title} src={props.src} />,
  li: ({node, ...props}) => <ListItem>{props.children}</ListItem>,
  ol: ({node, ...props}) => <OrderedList>{props.children}</OrderedList>,
  p: ({node, ...props}) => <Text>{props.children}</Text>,
  pre: ({node, ...props}) => <Text as="kbd">{props.children}</Text>,
  strong: ({node, ...props}) => <Text as="b">{props.children}</Text>,
  ul: ({node, ...props}) => <UnorderedList>{props.children}</UnorderedList>
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
