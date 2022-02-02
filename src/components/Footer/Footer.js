import { Box, Center, Flex, Link, LinkBox, LinkOverlay, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import URLs from "@/data/urls";

function Footer() {
  const startYear = 2021;
  let copyrightDatesString = `${startYear}`;

  const currentYear = new Date().getFullYear();
  if (currentYear > startYear) {
    copyrightDatesString += `-${currentYear}`;
  }
  return (
    <Center margin="30px 0px">
      <Stack direction="column" spacing="10px">
        <Center>
          <Stack
            direction="row"
            spacing="16px"
            alignItems="center"
          >
            <Link href={URLs.linkedin} isExternal>
              <FontAwesomeIcon icon={["fab", "linkedin"]} width="28px" />
            </Link>
            <Link href={URLs.github} isExternal>
              <FontAwesomeIcon icon={["fab", "github"]} width="28px" />
            </Link>
            <Link href={URLs.email} isExternal>
              <FontAwesomeIcon icon="envelope" width="28px" />
            </Link>
          </Stack>
        </Center>
        <LinkBox>
          <Stack direction="row" spacing="30px">
            <Box>&#169; {copyrightDatesString} Kavan Bickerstaff</Box>
            <Flex alignItems="center">
              <Box marginRight="6px">
                <FontAwesomeIcon icon="code" width="20px" />
              </Box>
              <LinkOverlay href={URLs.websiteRepo} isExternal>
                on GitHub
              </LinkOverlay>
            </Flex>
          </Stack>
        </LinkBox>
      </Stack>
    </Center>
  );
}

export default Footer;
