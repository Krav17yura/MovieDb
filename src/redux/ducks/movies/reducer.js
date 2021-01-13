const reMovie = (state = {
    movies: [],
    data: [],
    itemStatus: {
        load: true,
        error: false
    },
}, action) => {
    switch (action.type) {
        case 'IS_LOADED':
            return {
                ...state,
                itemStatus: {
                    ...state.itemStatus,
                    load: action.payload
                }
            }
        case 'SET_DATA':
            const page = action.payload.page
            let movieList = [];
            page === 1?  movieList = action.payload.results : movieList = [...state.movies, ...action.payload.results]

            return {
                ...state,
                movies: movieList,
                data: action.payload
            }
        case  'SET_DATA_ERROR':
            return {
                ...state,
                itemStatus: {
                    ...state.itemStatus,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}
export default reMovie;