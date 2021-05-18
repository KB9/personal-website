import Head from "next/head";
import { Container } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import JindoshRiddleInput from "../../components/JindoshRiddleInput";
import Solver from "../../services/jindosh-riddle-solver";

function JindoshRiddleSolver() {
  const solution = Solver.solve({});
  return (
    <>
      <Head>
        <title>Jindosh Riddle Solver | Kavan Bickerstaff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout maxWidth="container.xl" height="100vh">
        {solution.getTrueVars()}
        <Container maxWidth="container.md">
          <JindoshRiddleInput />
        </Container>
      </Layout>
    </>
  );
}

export default JindoshRiddleSolver;
