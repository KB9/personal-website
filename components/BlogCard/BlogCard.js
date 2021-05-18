import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

function BlogCard(props) {
  return (
    <LinkBox borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h2" size="lg">
        <LinkOverlay href={props.link}>{props.title}</LinkOverlay>
      </Heading>
      <Text>{props.text}</Text>
      <Text>{props.timestamp}</Text>
    </LinkBox>
  );
}

export default BlogCard;
