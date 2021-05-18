import { useState } from "react";
import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import JindoshRiddleInput from "../../components/JindoshRiddleInput";
import JindoshRiddleSolution from "../../components/JindoshRiddleSolution";
import Solver from "../../services/jindosh-riddle-solver";

function JindoshRiddleSolver() {
  const [solution, setSolution] = useState(null);

  const solveRiddle = (options) => {
    const results = Solver.solve(options);
    setSolution(results);
  }

  return (
    <>
      <Head>
        <title>Jindosh Riddle Solver | Kavan Bickerstaff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout maxWidth="container.xl" height="100vh">
        <Container maxWidth="container.md">
          <Box mb="4">
            <JindoshRiddleInput onSubmit={options => solveRiddle(options)} />
          </Box>
          {solution !== null ? <JindoshRiddleSolution solution={solution} /> : null}
        </Container>
      </Layout>
    </>
  );
}

export default JindoshRiddleSolver;
