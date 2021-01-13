import React from 'react'
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import './app.css'
import {Header} from "./components/Header";
import {Filters} from "./components/Filters";
import {Movies} from './components/Movies'


function App() {
    console.log(process.env.computername)
    return (
        <Box>
            <Header/>
            <Container maxWidth={"lg"} style={{paddingTop: 30}}>
                <Toolbar/>
                <Grid container>
                    <Filters/>
                    <Movies/>
                </Grid>
            </Container>

        </Box>
    )
}

export default App;
