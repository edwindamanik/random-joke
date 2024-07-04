import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Joke {
  setup: string,
  punchline: string
}

export interface CounterState {
  data: Joke | null;
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  data: null,
  loading: false,
  error: ""
}

export const getJoke = createAsyncThunk("joke", async() => {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await response.json();
  return data;
})

export const jokeSlice = createSlice({
name: 'joke',
initialState,
reducers: {},
extraReducers(builder){
  builder
  .addCase(getJoke.pending,(state) => {
      state.loading = true
  })
  .addCase(getJoke.fulfilled,(state, action: PayloadAction<Joke>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload
  })
  .addCase(getJoke.rejected,(state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
  })
}
})

export default jokeSlice.reducer
