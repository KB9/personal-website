import Logic from "logic-solver";

const colors = [
  "white",
  "red",
  "purple",
  "blue",
  "green"
];

const people = [
  "Lady Winslow",
  "Doctor Marcolla",
  "Countess Contee",
  "Madam Natsiou",
  "Baroness Finch"
];

const drinks = [
  "wine",
  "whiskey",
  "rum",
  "beer",
  "absinthe"
];

const cities = [
  "Dabokva",
  "Fraeport",
  "Baleton",
  "Dunwall",
  "Karnaca"
];

const heirlooms = [
  "Bird Pendant",
  "Diamond",
  "Ring",
  "Snuff Tin",
  "War Medal"
];

function optionId(optionValue, options) {
  return options.indexOf(optionValue);
}

function optionString(optionId, options) {
  return options[optionId];
}

const optionNames = [
  "jauntyHatPerson",
  "jauntyHatColor",
  "farLeftPerson",
  "jacketColor",
  "leftColor",
  "rightColor",
  "spilledDrinkDressColor",
  "spilledDrink",
  "entireDressCity",
  "entireDressColor",
  "braggedAboutHeirloom",
  "finerHeirloomCity",
  "prizedHeirloomOwner",
  "prizedHeirloom",
  "scoffingLadyCity",
  "scoffingLadyHeirloom",
  "valuableHeirloom",
  "visitorsCity",
  "spilledNextToVisitorDrink",
  "toastPerson",
  "toastDrink",
  "tableJumperCity",
  "tableJumperDrink",
  "centerDrink",
  "storyTellerPerson",
  "storyTellerCity"
];

function getMissingOptions(options) {
  const missingOptionNames = [];
  for (const name of optionNames) {
    if (!options.hasOwnProperty(name) || options[name] === null || options[name] === "") {
      missingOptionNames.push(name);
    }
  }
  return missingOptionNames;
}

function solve(options) {

  const missingOptionNames = getMissingOptions(options);
  if (missingOptionNames.length > 0) {
    return {
      success: false,
      missingOptionNames
    };
  }

  const personA = Logic.variableBits("personA", 4);
  const personB = Logic.variableBits("personB", 4);
  const personC = Logic.variableBits("personC", 4);
  const personD = Logic.variableBits("personD", 4);
  const personE = Logic.variableBits("personE", 4);
  const peopleVars = [personA, personB, personC, personD, personE];

  const colorA = Logic.variableBits("colorA", 4);
  const colorB = Logic.variableBits("colorB", 4);
  const colorC = Logic.variableBits("colorC", 4);
  const colorD = Logic.variableBits("colorD", 4);
  const colorE = Logic.variableBits("colorE", 4);
  const colorVars = [colorA, colorB, colorC, colorD, colorE];

  const drinkA = Logic.variableBits("drinkA", 4);
  const drinkB = Logic.variableBits("drinkB", 4);
  const drinkC = Logic.variableBits("drinkC", 4);
  const drinkD = Logic.variableBits("drinkD", 4);
  const drinkE = Logic.variableBits("drinkE", 4);
  const drinkVars = [drinkA, drinkB, drinkC, drinkD, drinkE];

  const cityA = Logic.variableBits("cityA", 4);
  const cityB = Logic.variableBits("cityB", 4);
  const cityC = Logic.variableBits("cityC", 4);
  const cityD = Logic.variableBits("cityD", 4);
  const cityE = Logic.variableBits("cityE", 4);
  const cityVars = [cityA, cityB, cityC, cityD, cityE];

  const heirloomA = Logic.variableBits("heirloomA", 4);
  const heirloomB = Logic.variableBits("heirloomB", 4);
  const heirloomC = Logic.variableBits("heirloomC", 4);
  const heirloomD = Logic.variableBits("heirloomD", 4);
  const heirloomE = Logic.variableBits("heirloomE", 4);
  const heirloomVars = [heirloomA, heirloomB, heirloomC, heirloomD, heirloomE];

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

  withinRange(peopleVars, 0, 4);
  withinRange(colorVars, 0, 4);
  withinRange(drinkVars, 0, 4);
  withinRange(cityVars, 0, 4);
  withinRange(heirloomVars, 0, 4);

  allDifferent(peopleVars);
  allDifferent(colorVars);
  allDifferent(drinkVars);
  allDifferent(cityVars);
  allDifferent(heirloomVars);

  // [Character] was at the far left
  const farLeftPerson = optionId(options.farLeftPerson, people);
  solver.require(Logic.equalBits(personA, Logic.constantBits(farLeftPerson)));

  // [Character] was at the far left, next to the guest wearing a [color] jacket.
  const jacketColor = optionId(options.jacketColor, colors);
  solver.require(Logic.equalBits(colorB, Logic.constantBits(jacketColor)));

  // The lady in [color] sat left of someone in [color]
  const leftColor = optionId(options.leftColor, colors);
  const rightColor = optionId(options.rightColor, colors);
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
  const jauntyHatPerson = optionId(options.jauntyHatPerson, people);
  const jauntyHatColor = optionId(options.jauntyHatColor, colors);
  findMatchesAtSameIndex(colorVars, jauntyHatColor, peopleVars, jauntyHatPerson);

  // I remember that [color] outfit because the woman spilled her [drink] all over it.
  const spilledDrink = optionId(options.spilledDrink, drinks);
  const spilledDrinkDressColor = optionId(options.spilledDrinkDressColor, colors);
  findMatchesAtSameIndex(drinkVars, spilledDrink, colorVars, spilledDrinkDressColor);

  // jumped up onto the table falling onto the guest in the center seat,
  // spilling the poor woman's [drink]
  const centerDrink = optionId(options.centerDrink, drinks);
  solver.require(
    Logic.equalBits(drinkC, Logic.constantBits(centerDrink))
  );

  // Then [character] captivated them all with a story about her wild youth in
  // [city].
  const storyTellerPerson = optionId(options.storyTellerPerson, people);
  const storyTellerCity = optionId(options.storyTellerCity, cities);
  findMatchesAtSameIndex(cityVars, storyTellerCity, peopleVars, storyTellerPerson);

  // The traveler from [city] was dressed entirely in [color].
  const entireDressColor = optionId(options.entireDressColor, colors);
  const entireDressCity = optionId(options.entireDressCity, cities);
  findMatchesAtSameIndex(colorVars, entireDressColor, cityVars, entireDressCity);

  // [Character] raised her [drink] in toast.
  const toastPerson = optionId(options.toastPerson, people);
  const toastDrink = optionId(options.toastDrink, drinks);
  findMatchesAtSameIndex(peopleVars, toastPerson, drinkVars, toastDrink);

  // The lady from [city], full of [drink], jumped up onto the table
  const tableJumperCity = optionId(options.tableJumperCity, cities);
  const tableJumperDrink = optionId(options.tableJumperDrink, drinks);
  findMatchesAtSameIndex(cityVars, tableJumperCity, drinkVars, tableJumperDrink);

  // So [character] showed off a prized [heirloom]
  const prizedHeirloomOwner = optionId(options.prizedHeirloomOwner, people);
  const prizedHeirloom = optionId(options.prizedHeirloom, heirlooms);
  findMatchesAtSameIndex(peopleVars, prizedHeirloomOwner, heirloomVars, prizedHeirloom);

  // at which the lady from [city] scoffed, saying it was no match for her
  // [heirloom].
  const scoffingLadyCity = optionId(options.scoffingLadyCity, cities);
  const scoffingLadyHeirloom = optionId(options.scoffingLadyHeirloom, heirlooms);
  findMatchesAtSameIndex(cityVars, scoffingLadyCity, heirloomVars, scoffingLadyHeirloom);

  // Someone else carried a valuable [heirloom] and when she saw it, the
  // visitor from [city] next to her
  const valuableHeirloom = optionId(options.valuableHeirloom, heirlooms);
  const visitorsCity = optionId(options.visitorsCity, cities);
  findMatchesAtSingleIndexDistance(heirloomVars, valuableHeirloom, cityVars, visitorsCity);

  // the visitor from [city] next to her almost spilled her neighbor's [drink].
  const spilledNextToVisitorDrink = optionId(options.spilledNextToVisitorDrink, drinks);
  findMatchesAtSingleIndexDistance(cityVars, visitorsCity, drinkVars, spilledNextToVisitorDrink);

  // When one of the dinner guests bragged about her [heirloom], the woman next
  // to her said they were finer in [city], where she lived.
  const braggedAboutHeirloom = optionId(options.braggedAboutHeirloom, heirlooms);
  const finerHeirloomCity = optionId(options.finerHeirloomCity, cities);
  findMatchesAtSingleIndexDistance(heirloomVars, braggedAboutHeirloom, cityVars, finerHeirloomCity);

  const solution = solver.solve();

  const solvedCityIds = cityVars.map(city => solution.evaluate(city));
  const solvedColorIds = colorVars.map(color => solution.evaluate(color));
  const solvedDrinkIds = drinkVars.map(drink => solution.evaluate(drink));
  const solvedHeirloomIds = heirloomVars.map(heirloom => solution.evaluate(heirloom));
  const solvedPeopleIds = peopleVars.map(person => solution.evaluate(person));

  const solvedCityStrings = solvedCityIds.map(id => optionString(id, cities));
  const solvedColorStrings = solvedColorIds.map(id => optionString(id, colors));
  const solvedDrinkStrings = solvedDrinkIds.map(id => optionString(id, drinks));
  const solvedHeirloomStrings = solvedHeirloomIds.map(id => optionString(id, heirlooms));
  const solvedPeopleStrings = solvedPeopleIds.map(id => optionString(id, people));

  return {
    success: true,
    solution: {
      cities: solvedCityStrings,
      colors: solvedColorStrings,
      drinks: solvedDrinkStrings,
      heirlooms: solvedHeirloomStrings,
      people: solvedPeopleStrings
    }
  };
}

export default {
  options: {
    colors,
    people,
    drinks,
    cities,
    heirlooms
  },
  optionNames,
  solve
};
