const reFilters = (state = {
    filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2020",
        with_genres: [],
        vote_average: [1,10]
    }
}, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state;
    }
}
export default reFilters;