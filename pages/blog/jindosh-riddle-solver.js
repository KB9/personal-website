import Head from "next/head";
import { Container } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import JindoshRiddleInput from "../../components/JindoshRiddleInput";

import Logic from "logic-solver";

const WHITE = 0;
const RED = 1;
const PURPLE = 2;
const BLUE = 3;
const GREEN = 4;

const WINSLOW = 0;
const MARCOLLA = 1;
const CONTEE = 2;
const NATSIOU = 3;
const FINCH = 4;

const WINE = 0;
const WHISKEY = 1;
const RUM = 2;
const BEER = 3;
const ABSINTHE = 4;

const DABOKVA = 0;
const FRAEPORT = 1;
const BALETON = 2;
const DUNWALL = 3;
const KARNACA = 4;

const BIRD_PENDANT = 0;
const DIAMOND = 1;
const RING = 2;
const SNUFF_TIN = 3;
const WAR_MEDAL = 4;

function JindoshRiddleSolver() {

  const personA = Logic.variableBits("personA", 4);
  const personB = Logic.variableBits("personB", 4);
  const personC = Logic.variableBits("personC", 4);
  const personD = Logic.variableBits("personD", 4);
  const personE = Logic.variableBits("personE", 4);
  const people = [personA, personB, personC, personD, personE];

  const colorA = Logic.variableBits("colorA", 4);
  const colorB = Logic.variableBits("colorB", 4);
  const colorC = Logic.variableBits("colorC", 4);
  const colorD = Logic.variableBits("colorD", 4);
  const colorE = Logic.variableBits("colorE", 4);
  const colors = [colorA, colorB, colorC, colorD, colorE];

  const drinkA = Logic.variableBits("drinkA", 4);
  const drinkB = Logic.variableBits("drinkB", 4);
  const drinkC = Logic.variableBits("drinkC", 4);
  const drinkD = Logic.variableBits("drinkD", 4);
  const drinkE = Logic.variableBits("drinkE", 4);
  const drinks = [drinkA, drinkB, drinkC, drinkD, drinkE];

  const cityA = Logic.variableBits("cityA", 4);
  const cityB = Logic.variableBits("cityB", 4);
  const cityC = Logic.variableBits("cityC", 4);
  const cityD = Logic.variableBits("cityD", 4);
  const cityE = Logic.variableBits("cityE", 4);
  const cities = [cityA, cityB, cityC, cityD, cityE];

  const heirloomA = Logic.variableBits("heirloomA", 4);
  const heirloomB = Logic.variableBits("heirloomB", 4);
  const heirloomC = Logic.variableBits("heirloomC", 4);
  const heirloomD = Logic.variableBits("heirloomD", 4);
  const heirloomE = Logic.variableBits("heirloomE", 4);
  const heirlooms = [heirloomA, heirloomB, heirloomC, heirloomD, heirloomE];

  const solver = new Logic.Solver();

  const findMatchesAtSameIndex = (varsA, valueA, varsB, valueB) => {
    solver.require(
      Logic.or(
        Logic.and(
          Logic.equalBits(varsA[0], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[0], Logic.constantBits(valueB))
        ),
        Logic.and(
          Logic.equalBits(varsA[1], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[1], Logic.constantBits(valueB))
        ),
        Logic.and(
          Logic.equalBits(varsA[2], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[2], Logic.constantBits(valueB))
        ),
        Logic.and(
          Logic.equalBits(varsA[3], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[3], Logic.constantBits(valueB))
        ),
        Logic.and(
          Logic.equalBits(varsA[4], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[4], Logic.constantBits(valueB))
        )
      )
    );
  };

  const findMatchesAtSingleIndexDistance = (varsA, valueA, varsB, valueB) => {
    solver.require(
      Logic.or(
        Logic.and(
          Logic.equalBits(varsA[0], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[1], Logic.constantBits(valueB))
        ),
        Logic.and(
          Logic.equalBits(varsA[1], Logic.constantBits(valueA)),
          Logic.or(
            Logic.equalBits(varsB[0], Logic.constantBits(valueB)),
            Logic.equalBits(varsB[2], Logic.constantBits(valueB))
          )
        ),
        Logic.and(
          Logic.equalBits(varsA[2], Logic.constantBits(valueA)),
          Logic.or(
            Logic.equalBits(varsB[1], Logic.constantBits(valueB)),
            Logic.equalBits(varsB[3], Logic.constantBits(valueB))
          )
        ),
        Logic.and(
          Logic.equalBits(varsA[3], Logic.constantBits(valueA)),
          Logic.or(
            Logic.equalBits(varsB[2], Logic.constantBits(valueB)),
            Logic.equalBits(varsB[4], Logic.constantBits(valueB))
          )
        ),
        Logic.and(
          Logic.equalBits(varsA[4], Logic.constantBits(valueA)),
          Logic.equalBits(varsB[3], Logic.constantBits(valueB))
        )
      )
    );
  };

  const withinRange = (vars, lowerBound, upperBound) => {
    for (let i = 0; i < vars.length; i++) {
      solver.require(Logic.greaterThanOrEqual(vars[i], Logic.constantBits(lowerBound)));
      solver.require(Logic.lessThanOrEqual(vars[i], Logic.constantBits(upperBound)));
    }
  };

  const allDifferent = (vars) => {
    for (let i = 0; i < vars.length; i++) {
      for (let j = 0; j < vars.length; j++) {
        if (i !== j) {
          solver.forbid(Logic.equalBits(vars[i], vars[j]));
        }
      }
    }
  };

  withinRange(people, 0, 4);
  withinRange(colors, 0, 4);
  withinRange(drinks, 0, 4);
  withinRange(cities, 0, 4);
  withinRange(heirlooms, 0, 4);

  allDifferent(people);
  allDifferent(colors);
  allDifferent(drinks);
  allDifferent(cities);
  allDifferent(heirlooms);

  // [Character] was at the far left
  const farLeftPerson = FINCH;
  solver.require(Logic.equalBits(personA, Logic.constantBits(farLeftPerson)));

  // [Character] was at the far left, next to the guest wearing a [color] jacket.
  const jacketColor = BLUE;
  solver.require(Logic.equalBits(colorB, Logic.constantBits(jacketColor)));

  // The lady in [color] sat left of someone in [color]
  const leftColor = RED;
  const rightColor = GREEN;
  solver.require(
    Logic.or(
      Logic.and(
        Logic.equalBits(colorA, Logic.constantBits(leftColor)),
        Logic.equalBits(colorB, Logic.constantBits(rightColor))
      ),
      Logic.and(
        Logic.equalBits(colorB, Logic.constantBits(leftColor)),
        Logic.equalBits(colorC, Logic.constantBits(rightColor))
      ),
      Logic.and(
        Logic.equalBits(colorC, Logic.constantBits(leftColor)),
        Logic.equalBits(colorD, Logic.constantBits(rightColor))
      ),
      Logic.and(
        Logic.equalBits(colorD, Logic.constantBits(leftColor)),
        Logic.equalBits(colorE, Logic.constantBits(rightColor))
      )
    )
  );

  // [character] wore a jaunty [color] hat
  const jauntyHatWearer = MARCOLLA;
  const jauntyHatColor = WHITE;
  findMatchesAtSameIndex(colors, jauntyHatColor, people, jauntyHatWearer);

  // I remember that [color] outfit because the woman spilled her [drink] all over it.
  const spilledDrink = ABSINTHE;
  const spilledDrinkDressColor = RED;
  findMatchesAtSameIndex(drinks, spilledDrink, colors, spilledDrinkDressColor);

  // jumped up onto the table falling onto the guest in the center seat,
  // spilling the poor woman's [drink]
  const centerDrink = BEER;
  solver.require(
    Logic.equalBits(drinkC, Logic.constantBits(centerDrink))
  );

  // Then [character] captivated them all with a story about her wild youth in
  // [city].
  const storyTellerPerson = WINSLOW;
  const storyTellerCity = DUNWALL;
  findMatchesAtSameIndex(cities, storyTellerCity, people, storyTellerPerson);

  // The traveler from [city] was dressed entirely in [color].
  const entireDressColor = PURPLE;
  const entireDressCity = KARNACA;
  findMatchesAtSameIndex(colors, entireDressColor, cities, entireDressCity);

  // [Character] raised her [drink] in toast.
  const toastPerson = NATSIOU;
  const toastDrink = WINE;
  findMatchesAtSameIndex(people, toastPerson, drinks, toastDrink);

  // The lady from [city], full of [drink], jumped up onto the table
  const tableJumperCity = FRAEPORT;
  const tableJumperDrink = WHISKEY;
  findMatchesAtSameIndex(cities, tableJumperCity, drinks, tableJumperDrink);

  // So [character] showed off a prized [heirloom]
  const prizedHeirloomOwner = CONTEE;
  const prizedHeirloom = SNUFF_TIN;
  findMatchesAtSameIndex(people, prizedHeirloomOwner, heirlooms, prizedHeirloom);

  // at which the lady from [city] scoffed, saying it was no match for her
  // [heirloom].
  const scoffingLadyCity = BALETON;
  const scoffingLadyHeirloom = DIAMOND;
  findMatchesAtSameIndex(cities, scoffingLadyCity, heirlooms, scoffingLadyHeirloom);

  // Someone else carried a valuable [heirloom] and when she saw it, the
  // visitor from [city] next to her
  const valuableHeirloom = WAR_MEDAL;
  const visitorsCity = DABOKVA;
  findMatchesAtSingleIndexDistance(heirlooms, valuableHeirloom, cities, visitorsCity);

  // the visitor from [city] next to her almost spilled her neighbor's [drink].
  const spilledNextToVisitorDrink = RUM;
  findMatchesAtSingleIndexDistance(cities, visitorsCity, drinks, spilledNextToVisitorDrink);

  // When one of the dinner guests bragged about her [heirloom], the woman next
  // to her said they were finer in [city], where she lived.
  const braggedAboutHeirloom = RING;
  const finerHeirloomCity = KARNACA;
  findMatchesAtSingleIndexDistance(heirlooms, braggedAboutHeirloom, cities, finerHeirloomCity);

  const solution = solver.solve();

  return (
    <>
      <Head>
        <title>Jindosh Riddle Solver | Kavan Bickerstaff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout maxWidth="container.xl" height="100vh">
        People: {people.map(person => solution.evaluate(person) + ", ")}<br/>
        Colors: {colors.map(color => solution.evaluate(color) + ", ")}<br/>
        Drinks: {drinks.map(drink => solution.evaluate(drink) + ", ")}<br/>
        Cities: {cities.map(city => solution.evaluate(city) + ", ")}<br/>
        Heirlooms: {heirlooms.map(heirloom => solution.evaluate(heirloom) + ", ")}
        <Container maxWidth="container.md">
          <JindoshRiddleInput />
        </Container>
      </Layout>
    </>
  );
}

export default JindoshRiddleSolver;
