import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text
} from "@chakra-ui/react";

function JindoshRiddleSolution(props) {
  if (props.solution === null) {
    return (
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Center>
          <Text color="red">No solution found!</Text>
        </Center>
      </Box>
    )
  }

  const {cities, colors, drinks, heirlooms, people} = props.solution;

  const createTableRow = (index) => {
    return (
      <Tr key={index}>
        <Td>{people[index]}</Td>
        <Td>{heirlooms[index]}</Td>
        <Td>{cities[index]}</Td>
        <Td>{colors[index]}</Td>
        <Td>{drinks[index]}</Td>
      </Tr>
    );
  };

  const tableRows = [];
  for (let i = 0; i < 5; i++) {
    const row = createTableRow(i);
    tableRows.push(row);
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Table>
        <TableCaption>Each person and their properties in left to right order.</TableCaption>
        <Thead>
          <Tr>
            <Th>Person</Th>
            <Th>Heirloom</Th>
            <Th>City</Th>
            <Th>Color</Th>
            <Th>Drink</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableRows}
        </Tbody>
      </Table>
    </Box>
  )
}

export default JindoshRiddleSolution;
