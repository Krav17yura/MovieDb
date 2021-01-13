import React, {useEffect, useState} from "react";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";

import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../redux/ducks/movies/actionCreators";

import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import 'moment/locale/ru'
import Loader from "../loading/loading";
import AppError from "../app-error";

const useStyle = makeStyles({
    movieList:{
        padding: "40px 0px",
        display: "flex",
        flexWrap: "wrap"
    },
    card: {
        margin: "0px 15px 30px 15px",

        width: "calc(((100vw - 80px - 260px - 128px) / 4))",
        maxWidth: "21%",
        borderRadius: '3%',
        webkitBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
        mozBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
        boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",

        "& img": {
            minHeight: "280px",
            objectFit: "cover",
            display: 'block',
            width: "100%",
            borderRadius: '3% 3% 0 0'
        },
    },
    footer: {
        padding: 10,
        '& .MuiTypography-root': {
            fontSize: 14,
            fontWeight: 800
        },
        '& span':{
            fontSize: 14,
            color: 'rgb(145,145,145)'
        }
    },

})


export const  Movies = () => {
    const classes = useStyle();
    const dispatch = useDispatch()

    const filters = useSelector((state) => state.reFilters.filters)
    const movies = useSelector((state) => state.reMovie.movies)

    const {load, error} = useSelector(({reMovie}) => reMovie.itemStatus)
    const [page, setPage] = useState(1)


    useEffect(() => {
        setPage(1)
    },[filters])

    useEffect(() => {
        dispatch(fetchData(filters, page))
    }, [dispatch,filters,page])



   if(error) return <AppError/>
   if(page === 1 && !load) return <Loader/>
    return(
        <Grid item sm={9} xs={12}>
            {movies?  <InfiniteScroll
                next={() => {
                    setPage(page => page + 1)
                }}
                hasMore={true}
                dataLength={movies.length}
                loader={<span/>}>
                <List className={classes.movieList}>
                    {movies && movies.map((movie) => (
                        <Box key={movie.id+movie.popularity} className={classes.card}>
                            <img
                                src={
                                    (movie.poster_path !== null && movie.backdrop_path !== null )?
                                    `https://image.tmdb.org/t/p/w500${ movie.poster_path ||
                                movie.backdrop_path}` : 'https://bodybigsize.com/wp-content/uploads/2020/02/noimage-18.png'   }
                                alt={''}/>
                            <Box className={classes.footer}>
                                <Box position="relative" display="inline-flex"  >
                                    <CircularProgress variant="determinate" value={movie.vote_average*10}/>
                                    <Box
                                        top={0}
                                        left={0}
                                        bottom={0}
                                        right={0}
                                        position="absolute"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color={'primary'}
                                    >
                                        <Typography variant="caption" component="div" color="textSecondary">
                                            {movie.vote_average*10}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography>
                                    {movie.title}
                                </Typography>
                                <span>
                                            {moment(movie.release_date).locale('ru').format('LL')}
                                    </span>
                            </Box>
                        </Box>
                    ))}
                </List>
            </InfiniteScroll>: null }
        </Grid>
    )
}