import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Layout(props) {
  let title = "Kavan Bickerstaff";
  if (props.title) {
    if (props.strictTitle) {
      title = props.title;
    } else {
      title = `${props.title} | ${title}`;
    }
  }
  return (
    <Box>
      <Head>
        <title>{title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Header />
      <Container
        paddingTop="56px"
        maxWidth={props.maxWidth}
        height={props.height}
      >
        {props.children}
      </Container>
      {props.hideFooter ? null : <Footer />}
    </Box>
  );
}

export default Layout;
