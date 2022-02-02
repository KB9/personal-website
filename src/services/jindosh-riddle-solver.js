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
  const id = options.indexOf(optionValue);
  return Logic.constantBits(id);
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

function createIntVarArray(length, labelPrefix, numBits) {
  const intVarArray = [];
  for (let i = 0; i < length; ++i) {
    const label = labelPrefix + i;
    intVarArray.push(Logic.variableBits(label, numBits));
  }
  return intVarArray;
}

function solve(options) {

  const missingOptionNames = getMissingOptions(options);
  if (missingOptionNames.length > 0) {
    return {
      success: false,
      missingOptionNames
    };
  }

  const arrayLength = 5;
  const numBits = 3;
  const peopleVars = createIntVarArray(arrayLength, "person", numBits);
  const colorVars = createIntVarArray(arrayLength, "color", numBits);
  const drinkVars = createIntVarArray(arrayLength, "drink", numBits);
  const cityVars = createIntVarArray(arrayLength, "city", numBits);
  const heirloomVars = createIntVarArray(arrayLength, "heirloom", numBits);

  const solver = new Logic.Solver();

  const requireMatchesAtSameIndex = (varsA, valueA, varsB, valueB) => {
    solver.require(
      Logic.or(
        Logic.and(
          Logic.equalBits(varsA[0], valueA),
          Logic.equalBits(varsB[0], valueB)
        ),
        Logic.and(
          Logic.equalBits(varsA[1], valueA),
          Logic.equalBits(varsB[1], valueB)
        ),
        Logic.and(
          Logic.equalBits(varsA[2], valueA),
          Logic.equalBits(varsB[2], valueB)
        ),
        Logic.and(
          Logic.equalBits(varsA[3], valueA),
          Logic.equalBits(varsB[3], valueB)
        ),
        Logic.and(
          Logic.equalBits(varsA[4], valueA),
          Logic.equalBits(varsB[4], valueB)
        )
      )
    );
  };

  const requireMatchesWithinSingleIndex = (varsA, valueA, varsB, valueB) => {
    solver.require(
      Logic.or(
        Logic.and(
          Logic.equalBits(varsA[0], valueA),
          Logic.equalBits(varsB[1], valueB)
        ),
        Logic.and(
          Logic.equalBits(varsA[1], valueA),
          Logic.or(
            Logic.equalBits(varsB[0], valueB),
            Logic.equalBits(varsB[2], valueB)
          )
        ),
        Logic.and(
          Logic.equalBits(varsA[2], valueA),
          Logic.or(
            Logic.equalBits(varsB[1], valueB),
            Logic.equalBits(varsB[3], valueB)
          )
        ),
        Logic.and(
          Logic.equalBits(varsA[3], valueA),
          Logic.or(
            Logic.equalBits(varsB[2], valueB),
            Logic.equalBits(varsB[4], valueB)
          )
        ),
        Logic.and(
          Logic.equalBits(varsA[4], valueA),
          Logic.equalBits(varsB[3], valueB)
        )
      )
    );
  };

  const lessThanOrEqual = (vars, upperBound) => {
    for (let i = 0; i < vars.length; i++) {
      solver.require(Logic.lessThanOrEqual(vars[i], upperBound));
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

  const upperBound = Logic.constantBits(4);
  lessThanOrEqual(peopleVars, upperBound);
  lessThanOrEqual(colorVars, upperBound);
  lessThanOrEqual(drinkVars, upperBound);
  lessThanOrEqual(cityVars, upperBound);
  lessThanOrEqual(heirloomVars, upperBound);

  allDifferent(peopleVars);
  allDifferent(colorVars);
  allDifferent(drinkVars);
  allDifferent(cityVars);
  allDifferent(heirloomVars);

  // [Character] was at the far left
  const farLeftPerson = optionId(options.farLeftPerson, people);
  solver.require(Logic.equalBits(peopleVars[0], farLeftPerson));

  // [Character] was at the far left, next to the guest wearing a [color] jacket.
  const jacketColor = optionId(options.jacketColor, colors);
  solver.require(Logic.equalBits(colorVars[1], jacketColor));

  // The lady in [color] sat left of someone in [color]
  const leftColor = optionId(options.leftColor, colors);
  const rightColor = optionId(options.rightColor, colors);
  solver.require(
    Logic.or(
      Logic.and(
        Logic.equalBits(colorVars[0], leftColor),
        Logic.equalBits(colorVars[1], rightColor)
      ),
      Logic.and(
        Logic.equalBits(colorVars[1], leftColor),
        Logic.equalBits(colorVars[2], rightColor)
      ),
      Logic.and(
        Logic.equalBits(colorVars[2], leftColor),
        Logic.equalBits(colorVars[3], rightColor)
      ),
      Logic.and(
        Logic.equalBits(colorVars[3], leftColor),
        Logic.equalBits(colorVars[4], rightColor)
      )
    )
  );

  // [character] wore a jaunty [color] hat
  const jauntyHatPerson = optionId(options.jauntyHatPerson, people);
  const jauntyHatColor = optionId(options.jauntyHatColor, colors);
  requireMatchesAtSameIndex(colorVars, jauntyHatColor, peopleVars, jauntyHatPerson);

  // I remember that [color] outfit because the woman spilled her [drink] all over it.
  const spilledDrink = optionId(options.spilledDrink, drinks);
  const spilledDrinkDressColor = optionId(options.spilledDrinkDressColor, colors);
  requireMatchesAtSameIndex(drinkVars, spilledDrink, colorVars, spilledDrinkDressColor);

  // jumped up onto the table falling onto the guest in the center seat,
  // spilling the poor woman's [drink]
  const centerDrink = optionId(options.centerDrink, drinks);
  solver.require(Logic.equalBits(drinkVars[2], centerDrink));

  // Then [character] captivated them all with a story about her wild youth in
  // [city].
  const storyTellerPerson = optionId(options.storyTellerPerson, people);
  const storyTellerCity = optionId(options.storyTellerCity, cities);
  requireMatchesAtSameIndex(cityVars, storyTellerCity, peopleVars, storyTellerPerson);

  // The traveler from [city] was dressed entirely in [color].
  const entireDressColor = optionId(options.entireDressColor, colors);
  const entireDressCity = optionId(options.entireDressCity, cities);
  requireMatchesAtSameIndex(colorVars, entireDressColor, cityVars, entireDressCity);

  // [Character] raised her [drink] in toast.
  const toastPerson = optionId(options.toastPerson, people);
  const toastDrink = optionId(options.toastDrink, drinks);
  requireMatchesAtSameIndex(peopleVars, toastPerson, drinkVars, toastDrink);

  // The lady from [city], full of [drink], jumped up onto the table
  const tableJumperCity = optionId(options.tableJumperCity, cities);
  const tableJumperDrink = optionId(options.tableJumperDrink, drinks);
  requireMatchesAtSameIndex(cityVars, tableJumperCity, drinkVars, tableJumperDrink);

  // So [character] showed off a prized [heirloom]
  const prizedHeirloomOwner = optionId(options.prizedHeirloomOwner, people);
  const prizedHeirloom = optionId(options.prizedHeirloom, heirlooms);
  requireMatchesAtSameIndex(peopleVars, prizedHeirloomOwner, heirloomVars, prizedHeirloom);

  // at which the lady from [city] scoffed, saying it was no match for her
  // [heirloom].
  const scoffingLadyCity = optionId(options.scoffingLadyCity, cities);
  const scoffingLadyHeirloom = optionId(options.scoffingLadyHeirloom, heirlooms);
  requireMatchesAtSameIndex(cityVars, scoffingLadyCity, heirloomVars, scoffingLadyHeirloom);

  // Someone else carried a valuable [heirloom] and when she saw it, the
  // visitor from [city] next to her
  const valuableHeirloom = optionId(options.valuableHeirloom, heirlooms);
  const visitorsCity = optionId(options.visitorsCity, cities);
  requireMatchesWithinSingleIndex(heirloomVars, valuableHeirloom, cityVars, visitorsCity);

  // the visitor from [city] next to her almost spilled her neighbor's [drink].
  const spilledNextToVisitorDrink = optionId(options.spilledNextToVisitorDrink, drinks);
  requireMatchesWithinSingleIndex(cityVars, visitorsCity, drinkVars, spilledNextToVisitorDrink);

  // When one of the dinner guests bragged about her [heirloom], the woman next
  // to her said they were finer in [city], where she lived.
  const braggedAboutHeirloom = optionId(options.braggedAboutHeirloom, heirlooms);
  const finerHeirloomCity = optionId(options.finerHeirloomCity, cities);
  requireMatchesWithinSingleIndex(heirloomVars, braggedAboutHeirloom, cityVars, finerHeirloomCity);

  const solution = solver.solve();
  if (solution === null) {
    return {
      success: true,
      missingOptionNames,
      solution: null
    };
  }

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
    missingOptionNames,
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
