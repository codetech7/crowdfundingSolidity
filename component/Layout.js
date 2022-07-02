import React from 'react';
import Header from './Header';
import {Container} from "semantic-ui-react";
import Head from 'next/head';
import "semantic-ui-css/semantic.min.css";


const Layout = (props) => {
    return(
  <Container>
    <Head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/></Head>
    <Header  />
        {props.children}
  </Container>
    );
}

export default Layout;