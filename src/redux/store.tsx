import { configureStore } from '@reduxjs/toolkit'
import jokeReducer from '../redux/jokeSlice'

export const store = configureStore({
  reducer: {
    joke: jokeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch