import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputLabel from "@material-ui/core/InputLabel";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import {Button} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {API_KEY_3, API_URL} from "../../constants";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setFilters} from "../../redux/ducks/filters/actionCreators";



const useStyle = makeStyles((theme) => ({
    filterSideGrid: {
        "& .MuiTypography-root": {
            fontWeight: 500
        },
        "& form": {
            padding: theme.spacing(1),
            paddingLeft: 0,

            "& .MuiAccordion-root": {
                borderRadius: 10,
                marginBottom: 20,
                "&:before": {
                    display: 'none'
                },
                "& .MuiAccordionSummary-root": {},
                "& .MuiAccordionDetails-root": {
                    flexDirection: 'column',
                    "& .MuiBox-root": {
                        padding: "10px 0px",
                        borderBottom: '1px solid rgb(238,238,238)',
                        '& .MuiInputLabel-root': {
                            fontSize: 18,
                            fontWeight: 500,
                            color: 'rgb(154,154,154)'
                        }
                    }
                },
                "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
                    transform: "rotate(90deg)"
                }
            },

            "& .MuiAccordion-root.Mui-expanded": {
                marginTop: 0,
                "& .MuiAccordionSummary-root": {
                    borderBottom: '1px solid rgb(238,238,238)'
                },

            },
            "& .MuiButton-root": {
                backgroundColor: "rgb(1,180,228)",
                color: 'white',
                borderRadius: 15,
                "&:hover": {
                    backgroundColor: "rgb(35,63,69)",
                }
            }
        }
    }
}))

export const Filters = () => {
    const dispatch = useDispatch();
    const classes = useStyle();
    
    const {control, handleSubmit } = useForm();

    const [genresList, setGenresList] = useState([]);
    const [genresValues, setGenresValues] = useState('');
    const [expanded, setExpanded] = React.useState('');
    const [sliderValue, setSliderValue] = React.useState([1, 10]);

    const SliderHandleChangeValue = (event, newValue) => {
        setSliderValue(newValue);
    };

    const AccordionHandleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        axios.get(link)
            .then((resp) => {
            setGenresList(resp.data.genres)
        });
    },[setGenresList])



    function GenresHandleChangeValue(checkedName) {
        const newNames = genresValues?.includes(checkedName)
            ? genresValues?.filter(name => name !== checkedName)
            : [...(genresValues ?? []), checkedName];
        setGenresValues(newNames);
        return newNames;
    }

    function valuetext(value) {
        return `${value}°C`;
    }

    const onSubmit = data => {
        const{primary_release_year, sort_by} = data
        const filters = {
            sort_by:  sort_by.value,
            primary_release_year: primary_release_year.value,
            with_genres: genresValues,
            vote_average: sliderValue
        }
        dispatch(setFilters(filters))
    };

    return (
        <Grid item sm={3} md={3} xs={12} className={classes.filterSideGrid} >
            <Typography variant={'h5'}>
                Популярные фильмы
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Accordion square expanded={expanded === 'panel1'} onChange={AccordionHandleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ArrowForwardIosIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Сортировать</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                            Сортировать результаты по
                        </InputLabel>
                        <Controller
                            name="sort_by"
                            as={Select}
                            control={control}
                            options={[
                                {label: 'Популярности(убывание)', value: 'popularity.desc'},
                                {label: 'Популярности(возрастрание)', value: 'popularity.asc'},
                                {label: 'Рейтингу(убывание)', value: 'vote_average.desc'},
                                {label: 'Рейтингу(возрастание)', value: 'vote_average.asc'},
                                {label: 'Дате выпуска(убывание)', value: 'date.desc'},
                                {label: 'Дата выпуска(возрастание)', value: 'date.asc'},
                            ]}
                            defaultValue={{label: 'Популярности(убывание)', value: 'popularity.desc'}}
                        >

                        </Controller>
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === 'panel2'} onChange={AccordionHandleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ArrowForwardIosIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Фильтры</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <InputLabel shrink htmlFor="primary_release_year-placeholder">
                                Дата выпуска
                            </InputLabel>
                            <Controller
                                name="primary_release_year"
                                as={<Select onChange={() => console.log("hello")}/>}
                                control={control}
                                options={[
                                    {label: '2021', value: '2021'},
                                    {label: '2020', value: '2020'},
                                    {label: '2019', value: '2019'},
                                    {label: '2018', value: '2018'},
                                    {label: '2017', value: '2017'},
                                    {label: '2016', value: '2016'},
                                    {label: '2015', value: '2015'},
                                    {label: '2014', value: '2014'},
                                ]}
                                defaultValue={{label: '2020', value: '2020'}}
                            >
                            </Controller>
                        </Box>

                        <Box>
                            <InputLabel shrink htmlFor="genres">
                                Жарны:
                            </InputLabel>
                            {genresList &&  genresList.map((item) => (
                                <span key={item.id}>
                                    <input type="checkbox" id={item.id}
                                           checked={genresValues.includes(item.id)}
                                           onChange={() => GenresHandleChangeValue(item.id)}/><label
                                    htmlFor={item.id}>{item.name}</label>
                                </span>
                            ))}
                        </Box>

                        <Box>
                            <InputLabel shrink htmlFor="vote_average">
                                Пользовательский Рейтинг
                            </InputLabel>
                            <Slider
                                value={sliderValue}
                                onChange={SliderHandleChangeValue}
                                getAriaValueText={valuetext}
                                aria-labelledby="range-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={10}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Button
                    fullWidth
                    type={"submit"}
                >
                    Поиск
                </Button>
            </form>
        </Grid>
    )
}