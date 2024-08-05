import { configureStore } from '@reduxjs/toolkit'
import quizreducer from './counter/quizSlice'

export const store = configureStore({
  reducer: {
    quizes: quizreducer,
  },
})