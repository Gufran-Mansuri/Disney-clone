import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    recommended: null,
    newDisney: null,
    trending: null,
    original: null,
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.recommended = action.payload.recommended;
            state.newDisney = action.payload.newDisney;
            state.trending = action.payload.trending;
            state.original = action.payload.original;
        }
    }
})

export const {setMovies} = movieSlice.actions;

export const selectRecommended = (state) => state.movie.recommended;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectTrending = (state) => state.movie.trending;
export const selectOriginal = (state) => state.movie.original;

export default movieSlice.reducer;
