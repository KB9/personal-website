import { useState } from "react";
import { Box, Button, Center, Heading, HStack, Select, Tooltip } from "@chakra-ui/react";

import Solver from "../../services/jindosh-riddle-solver";

const { cities, colors, drinks, heirlooms, people } = Solver.options;

const presetOptions = {
  jauntyHatPerson: people[1],
  jauntyHatColor: colors[0],
  farLeftPerson: people[4],
  jacketColor: colors[3],
  leftColor: colors[1],
  rightColor: colors[4],
  spilledDrinkDressColor: colors[1],
  spilledDrink: drinks[4],
  entireDressCity: cities[4],
  entireDressColor: colors[2],
  braggedAboutHeirloom: heirlooms[2],
  finerHeirloomCity: cities[4],
  prizedHeirloomOwner: people[2],
  prizedHeirloom: heirlooms[3],
  scoffingLadyCity: cities[2],
  scoffingLadyHeirloom: heirlooms[1],
  valuableHeirloom: heirlooms[4],
  visitorsCity: cities[0],
  spilledNextToVisitorDrink: drinks[2],
  toastPerson: people[3],
  toastDrink: drinks[0],
  tableJumperCity: cities[1],
  tableJumperDrink: drinks[1],
  centerDrink: drinks[3],
  storyTellerPerson: people[0],
  storyTellerCity: cities[3]
}

function generateSelectOptions(optionValues) {
  return optionValues.map(option => (
    <option key={option} value={option}>{option}</option>
  ));
}

function JindoshRiddleInput(props) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const createOptionSelect = (optionName, optionValues) => {
    const value = selectedOptions[optionName] || "";
    const onValueChange = (evt) => {
      setSelectedOptions({
        ...selectedOptions,
        [optionName]: evt.target.value
      });
    };
    const selectOptions = generateSelectOptions(optionValues);
    const isMissingValue = props.missingOptionNames.includes(optionName);
    return (
      <Box display="inline-block" width="auto">
        <Select
          h="28px"
          value={value}
          onChange={onValueChange}
          placeholder=" "
          isInvalid={isMissingValue}
        >
          {selectOptions}
        </Select>
      </Box>
    );
  }

  const jauntyHatPerson = createOptionSelect("jauntyHatPerson", people);
  const jauntyHatColor = createOptionSelect("jauntyHatColor", colors);
  const farLeftPerson = createOptionSelect("farLeftPerson", people);
  const jacketColor = createOptionSelect("jacketColor", colors);
  const leftColor = createOptionSelect("leftColor", colors);
  const rightColor = createOptionSelect("rightColor", colors);
  const spilledDrinkDressColor = createOptionSelect("spilledDrinkDressColor", colors);
  const spilledDrink = createOptionSelect("spilledDrink", drinks);
  const entireDressCity = createOptionSelect("entireDressCity", cities);
  const entireDressColor = createOptionSelect("entireDressColor", colors);
  const braggedAboutHeirloom = createOptionSelect("braggedAboutHeirloom", heirlooms);
  const finerHeirloomCity = createOptionSelect("finerHeirloomCity", cities);
  const prizedHeirloomOwner = createOptionSelect("prizedHeirloomOwner", people);
  const prizedHeirloom = createOptionSelect("prizedHeirloom", heirlooms);
  const scoffingLadyCity = createOptionSelect("scoffingLadyCity", cities);
  const scoffingLadyHeirloom = createOptionSelect("scoffingLadyHeirloom", heirlooms);
  const valuableHeirloom = createOptionSelect("valuableHeirloom", heirlooms);
  const visitorsCity = createOptionSelect("visitorsCity", cities);
  const spilledNextToVisitorDrink = createOptionSelect("spilledNextToVisitorDrink", drinks);
  const toastPerson = createOptionSelect("toastPerson", people);
  const toastDrink = createOptionSelect("toastDrink", drinks);
  const tableJumperCity = createOptionSelect("tableJumperCity", cities);
  const tableJumperDrink = createOptionSelect("tableJumperDrink", drinks);
  const centerDrink = createOptionSelect("centerDrink", drinks);
  const storyTellerPerson = createOptionSelect("storyTellerPerson", people);
  const storyTellerCity = createOptionSelect("storyTellerCity", cities);

  const unknownHeirlooms = [];
  const heirloomSelectOptions = generateSelectOptions(heirlooms);
  for (const heirloom of heirlooms) {
    if (selectedOptions.prizedHeirloom && heirloom === selectedOptions.prizedHeirloom) {
      continue;
    }

    let value = " ";
    if (selectedOptions.prizedHeirloom) {
      value = heirloom;
    }

    unknownHeirlooms.push(
      <Tooltip
        label="This option does not affect the solution. It is filled in automatically by selecting other options."
        aria-label="A tooltip"
      >
        <Box display="inline-block" width="auto">
          <Select
            h="28px"
            value={value}
            placeholder=" "
            disabled={true}
            icon={<span/>}
          >
            {heirloomSelectOptions}
          </Select>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Center>
        <Heading mb="4">The Jindosh Riddle</Heading>
      </Center>
      <Box mb="4">
        At the dinner party were Lady Winslow, Doctor Marcolla, Countess
        Contee, Madam Natsiou, and Baroness Finch.
      </Box>
      <Box mb="4">
        The women sat in a row. They all wore different colors and
        {jauntyHatPerson} wore a jaunty {jauntyHatColor} hat.
        {farLeftPerson} was at the far left, next to the guest wearing a
        {jacketColor} jacket. The lady in {leftColor} sat left of someone in
        {rightColor}. I remember that {spilledDrinkDressColor} outfit because
        the woman spilled her {spilledDrink} all over it. The traveler from
        {entireDressCity} was dressed entirely in {entireDressColor}. When one
        of the dinner guests bragged about her {braggedAboutHeirloom}, the
        woman next to her said they were finer in {finerHeirloomCity}, where
        she lived.
      </Box>
      <Box mb="4">
        So {prizedHeirloomOwner} showed off a prized {prizedHeirloom}, at which
        the lady from {scoffingLadyCity} scoffed, saying it was no match for
        her {scoffingLadyHeirloom}. Someone else carried a valuable
        {valuableHeirloom} and when she saw it, the visitor from
        {visitorsCity} next to her almost spilled her neighbor's
        {spilledNextToVisitorDrink}. {toastPerson} raised her {toastDrink} in
        toast. The lady from {tableJumperCity}, full of {tableJumperDrink},
        jumped up onto the table falling onto the guest in the center seat,
        spilling the poor woman's {centerDrink}. Then {storyTellerPerson}{" "}
        captivated them all with a story about her wild youth in
        {storyTellerCity}.
      </Box>
      <Box mb="4">
        {/* TODO: Set these after prizedHeirloom is set, as we know who owns it */}
        In the morning there were four heirlooms under the table: {unknownHeirlooms[0]},
        {unknownHeirlooms[1]}, {unknownHeirlooms[2]}, and {unknownHeirlooms[3]}.
      </Box>
      <Box mb="4">
        But who owned each?
      </Box>
      <Center>
        <HStack>
          <Button
            size="lg"
            width="250px"
            onClick={() => props.onSubmit(selectedOptions)}
          >
            Solve
          </Button>
          <Button
            size="lg"
            width="250px"
            onClick={() => setSelectedOptions(presetOptions)}
          >
            Generate preset
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}

export default JindoshRiddleInput;
