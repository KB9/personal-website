import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";

import Layout from "@/components/Layout";
import JindoshRiddleInput from "@/components/JindoshRiddleInput";
import JindoshRiddleSolution from "@/components/JindoshRiddleSolution";
import Solver from "@/services/jindosh-riddle-solver";

function JindoshRiddleSolver() {
  const [solverResult, setSolverResult] = useState(null);

  const solveRiddle = (options) => {
    const result = Solver.solve(options);
    setSolverResult(result);
  }

  let wasSolveSuccessful = false;
  let missingOptionNames = [];
  if (solverResult !== null) {
    wasSolveSuccessful = solverResult.success;
    missingOptionNames = solverResult.missingOptionNames;
  }

  return (
    <Layout title="Jindosh Riddle Solver" maxWidth="container.xl">
      <Container maxWidth="container.md">
        <Box mb="4">
          <JindoshRiddleInput
            onSubmit={options => solveRiddle(options)}
            missingOptionNames={missingOptionNames}
          />
        </Box>
        {wasSolveSuccessful ? <JindoshRiddleSolution solution={solverResult.solution} /> : null}
      </Container>
    </Layout>
  );
}

export default JindoshRiddleSolver;
