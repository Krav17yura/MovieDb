import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from '@material-ui/icons/Search';
import {Container} from "@material-ui/core";

const useStyle = makeStyles({
    appHeader: {
        "& .MuiToolbar-root": {
            backgroundColor: "rgb(3,37,65)",
            "& .MuiContainer-root": {
                display: "flex",
                alignItems: "center",
                "& .MuiTypography-root": {
                    fontWeight: 800,
                    color: 'rgb(113,214,111)'
                },
                "& .MuiBox-root": {
                    marginLeft: 'auto',
                    '& .MuiIconButton-root': {
                        '& .MuiSvgIcon-root': {
                            fontSize: 28
                        }
                    }
                }
            }
        }
    }
})

export const Header = () => {
    const classes = useStyle();
    const trigger = useScrollTrigger({threshold: 30});
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar className={classes.appHeader}>
                <Toolbar>
                    <Container maxWidth={"lg"}>
                        <Typography variant="h5">Movie-DB</Typography>
                        {/*<Box>*/}
                        {/*    <IconButton color={"primary"}>*/}
                        {/*        <SearchIcon/>*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </Container>
                </Toolbar>
            </AppBar>
        </Slide>
    );
}