import Link from "next/link";
import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

function BlogCard(props) {
  return (
    <LinkBox borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h2" size="lg">
        <Link href={props.link} passHref>
          <LinkOverlay>{props.title}</LinkOverlay>
        </Link>
      </Heading>
      <Text>{props.text}</Text>
      <Text>{props.timestamp}</Text>
    </LinkBox>
  );
}

export default BlogCard;
