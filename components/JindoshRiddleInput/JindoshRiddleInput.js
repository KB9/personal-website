import { Box, Center, Heading, Text } from "@chakra-ui/react";

function JindoshRiddleInput() {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Center>
        <Heading mb="4">The Jindosh Riddle</Heading>
      </Center>
      <Text mb="4">
        At the dinner party were Lady Winslow, Doctor Marcolla, Countess
        Contee, Madam Natsiou, and Baroness Finch.
      </Text>
      <Text mb="4">
        The women sat in a row. They all wore different colors and [character]
        wore a jaunty [color] hat. [Character] was at the far left, next to the
        guest wearing a [color] jacket. The lady in [color] sat left of someone
        in [color]. I remember that [color] outfit because the woman spilled
        her [drink] all over it. The traveler from [city] was dressed entirely
        in [color]. When one of the dinner guests bragged about her [heirloom],
        the woman next to her said they were finer in [city], where she lived.
      </Text>
      <Text mb="4">
        So [character] showed off a prized [heirloom], at which the lady from
        [city] scoffed, saying it was no match for her [heirloom]. Someone else
        carried a valuable [heirloom] and when she saw it, the visitor from
        [city] next to her almost spilled her neighbor's [drink]. [Character]
        raised her [drink] in toast. The lady from [city], full of [drink],
        jumped up onto the table falling onto the guest in the center seat,
        spilling the poor woman's [drink]. Then [character] captivated them all
        with a story about her wild youth in [city].
      </Text>
      <Text mb="4">
        In the morning there were four heirlooms under the table: [heirloom],
        [heirloom], [heirloom], and [heirloom].
      </Text>
      <Text>
        But who owned each?
      </Text>
    </Box>
  );
}

export default JindoshRiddleInput;
