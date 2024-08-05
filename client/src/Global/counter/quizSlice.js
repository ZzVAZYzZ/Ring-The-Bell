import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizes: [],
}

export const quizSlice = createSlice({
  name: 'quizes',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
        state.quizes.push(action.payload) 
      },
  },
})


export const { addQuiz, logQuizs } = quizSlice.actions

export default quizSlice.reducer