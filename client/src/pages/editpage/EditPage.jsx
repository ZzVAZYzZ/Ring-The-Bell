import { useEffect, useState } from "react";
import "./scss/editpage.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setFlagment, editData } from "../../Global/counter/quizSlice";

export function EditPage() {
    const quizData = useSelector((state) => state.quizes.quizData);
    const flagId = useSelector((state) => state.quizes.boxId);
    const dispatch = useDispatch()
    const [question, setQuestion] = useState("");
    const [correctCheck,setCorrectCheck] = useState('A');
    const [answerA,setanswerA] = useState("");
    const [answerB,setanswerB] = useState("");
    const [answerC,setanswerC] = useState("");
    const [answerD,setanswerD] = useState("");

    useEffect(()=>{
      dispatch(setFlagment());
      if(quizData.correctAnswer!==""){
        setCorrectCheck(quizData.correctAnswer);
      }
    },[])

    function handleQuestionChange(e){
        setQuestion(e.target.value);
    }

    function handleSave(){
      const quizData = {
        boxId: flagId,
        question : question,
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        answerD: answerD,
        correctAnswer: correctCheck,
      }
      dispatch(editData(quizData));
    }

    function handleAnswerChange(e,a){
        if(a==="A"){
            setanswerA(e.target.value);
        }else if(a==="B"){
            setanswerB(e.target.value);
        }else if(a==="C"){
            setanswerC(e.target.value);
        }else if(a==="D"){
            setanswerD(e.target.value);
        }
    }

    function handleCorrectCheck(e){
        setCorrectCheck(e.target.value);
    }

    useEffect(()=>{
      console.log(quizData);
    },[])

  return (
    <>
      <div className="editpage">
        <header>
          <h2>11</h2>
        </header>
        <div className="question-place">
          <textarea placeholder="Edit your question here!" onChange={(e)=>handleQuestionChange(e)} defaultValue={quizData.question}></textarea>
        </div>
        <div className="answer-place">
          <div className="answer-place-r1">
            <div className="answerA">
              <div className="answer">
                <div>
                  A. <input onChange={(e)=>handleAnswerChange(e,"A")} defaultValue={quizData.answerA}></input>
                </div>
              </div>
              <button className={`${correctCheck==="A"?"active-correct":"check-correct"}`} value="A"  onClick={(e)=>handleCorrectCheck(e)}></button>
            </div>
            <div className="answerB">
              <div className="answer">
                <div>
                  B. <input onChange={(e)=>handleAnswerChange(e,"B")} defaultValue={quizData.answerB}></input>
                </div>
              </div>
              <button className={`${correctCheck==="B"?"active-correct":"check-correct"}`} value="B" onClick={(e)=>handleCorrectCheck(e)}></button>
            </div>
          </div>
          <div className="answer-place-r2">
            <div className="answerC">
              <div className="answer">
                <div>
                  C. <input onChange={(e)=>handleAnswerChange(e,"C")} defaultValue={quizData.answerC}></input>
                </div>
              </div>
              <button className={`${correctCheck==="C"?"active-correct":"check-correct"}`} value="C" onClick={(e)=>handleCorrectCheck(e)}></button>
            </div>
            <div className="answerD">
              <div className="answer">
                <div>
                  D. <input onChange={(e)=>handleAnswerChange(e,"D")} defaultValue={quizData.answerD}></input>
                </div>
              </div>
              <button className={`${correctCheck==="D"?"active-correct":"check-correct"}`} value="D" onClick={(e)=>handleCorrectCheck(e)}></button>
            </div>
          </div>
        </div>
        <div className="button-place">
            <Link to="/">
                <button className="back-button">BACK</button>
            </Link>
          <button className="delete-button">DELETE</button>
          <Link to="/">
            <button className="save-button" onClick={handleSave}>SAVE</button>
          </Link>
          
        </div>
      </div>
    </>
  );
}
