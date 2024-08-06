import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizes: [],
  flagment: true,
  boxId: "",
  quizData:{},
  quizCount:0,
  chooseCorrect:0,
}

export const quizSlice = createSlice({
  name: 'quizes',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
        state.quizes.push(action.payload) 
      },
    setFlagment: (state) => {
        state.flagment = true;
    },
    disFlagment: (state) => {
      state.flagment = false;
    },
    editData: (state, action)=>{

      let foundIndex = state.quizes.findIndex(obj =>  obj.boxId === state.boxId)
      if(foundIndex>=0){
        state.quizes[foundIndex] = action.payload;
      }
      
    },
    getQuizData:(state)=>{
      let foundIndex = state.quizes.findIndex(obj =>  obj.boxId === state.boxId)
      if(foundIndex>=0){
        state.quizData = state.quizes[foundIndex]
      }
    },
    setBoxId: (state,action)=>{
      state.boxId=action.payload;
      
    },
    increaseQuizCount: (state)=>{
      if (state.quizCount<state.quizes.length-1) {
        state.quizCount++;
      }
    },
    increaseChooseCorrect: (state)=>{
      if (state.chooseCorrect<state.quizes.length-1) {
        state.chooseCorrect++;
      }
    },
    resetCache:(state)=>{
      state.quizCount=0;
      state.chooseCorrect=0;
    }
  },
})


export const { addQuiz, setFlagment, disFlagment, editData, setBoxId, getQuizData, increaseQuizCount, increaseChooseCorrect, resetCache} = quizSlice.actions

export default quizSlice.reducer