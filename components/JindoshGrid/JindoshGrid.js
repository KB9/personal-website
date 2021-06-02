import {
  Box,
  Center,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

function JindoshGrid(props) {
  const { cols, rows, topHeaders, leftHeaders, useFirstCell, cellContents } = props;

  const w = 50;
  const h = 50;
  const border = 1;

  const gridCells = [];
  for (let i = 0; i < cols * rows; ++i) {
    let text = null;
    if (i > 0 || useFirstCell) {
      const topHeaderIdx = i - (useFirstCell ? 0 : 1);
      const leftHeaderIdx = i / cols - 1;
      if (i < cols && topHeaderIdx < topHeaders.length) {
        text = <Text>{topHeaders[topHeaderIdx]}</Text>;
      }
      if (i > 0 && i % cols == 0 && leftHeaderIdx < leftHeaders.length) {
        text = <Text>{leftHeaders[leftHeaderIdx]}</Text>;
      }
    }

    if (cellContents && cellContents.hasOwnProperty(i)) {
      text = cellContents[i];
    }

    const cell = (
      <Box
        w={`${w}px`}
        h={`${h}px`}
        mr={`${border}px`}
        mb={`${border}px`}
        bg="white"
        fontSize="xs"
        key={i}
      >
        <Center w="100%" h="100%">
          {text}
        </Center>
      </Box>
    )
    gridCells.push(cell);
  }

  const totalW = (w + border) * cols + border;
  const totalH = (h + border) * rows + border;
  return (
    <Center>
      <Box
        w={`${totalW}px`}
        h={`${totalH}px`}
        bg="black"
        border={`${border}px solid black`}
        userSelect="none"
      >
        <SimpleGrid columns={cols}>
          {gridCells}
        </SimpleGrid>
      </Box>
    </Center>
  );
}

export default JindoshGrid;
