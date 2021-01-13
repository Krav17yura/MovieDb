import axios from "axios";
import queryString from 'query-string'

import {API_URL, API_KEY_3} from '../../../constants'

export const isLoaded = (value) => {
    return {
        type: 'IS_LOADED',
        payload: value
    }
}

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        payload: data
    }
}


export const setDataError = (value) => {
    return {
        type: "SET_DATA_ERROR",
        payload: value
    }
}

export const  fetchData =   (filters, page) => dispatch => {
    dispatch(isLoaded(false))
    const { sort_by, primary_release_year, with_genres, vote_average } = filters;
    const  queryStringParams = {
        api_key: API_KEY_3,
        language: "ru-RU",
        sort_by: sort_by,
        primary_release_year: primary_release_year,
        page
    };
    if (with_genres.length > 0)
        queryStringParams.with_genres = with_genres.join(",");

    axios.get(`${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}&vote_average.gte=${vote_average[0]}&vote_average.lte=${vote_average[1]}`)
        .catch(() => dispatch(setDataError(true)))
        .then((res) => {
            dispatch(setData(res.data, page))
            dispatch(isLoaded(true))
        })



}