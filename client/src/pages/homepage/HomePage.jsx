import { useEffect, useState } from "react"
import { Link } from "react-router-dom"; 
import "./scss/homepage.css"
import { useSelector, useDispatch } from 'react-redux'
import { addQuiz } from "../../Global/counter/quizSlice";

export function HomePage() {
    const quizes = useSelector((state) => state.quizes)
    const dispatch = useDispatch()

    const [numberQuiz,setNumberQuiz] = useState(1);
    const [quizChoice,setQuizChoice] = useState("trBox1");

    useEffect(()=>{
        const currentBox = {
            boxId : `trBox${numberQuiz}`,
            question : "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            correctAnswer: ""
        }
        dispatch(addQuiz(currentBox))
    },[numberQuiz])

    useEffect(()=>{
        console.log(quizes);
    },[quizes])

    function handleQuizClick(e){
        setQuizChoice(e.target.id);
    }

    function renderQuizzes(){
        let quizzes = [];
        let childCount = Math.ceil(numberQuiz / 9); 
        for (let i = 0; i < childCount; i++) {
          let boxes = [];
          for (let j = 0; j < Math.min(9, numberQuiz - i * 9); j++) {
           
            const boxId = `trBox${i * 9 + j + 1}`;
            const isSelected = quizChoice === boxId;
            boxes.push(
              <button key={`box-${i * 9 + j}`}  className={`tr-box ${isSelected ? "quizChoice" : ""}`} id={`trBox${i * 9 + j + 1}`} onClick={(e)=>handleQuizClick(e)}>
                {i * 9 + j + 1}
              </button>
            );
            
          }
          quizzes.push(
            <div key={`child-${i}`} className="tr-child">
              {boxes}
            </div>
          );
        }
        return quizzes;
      };

    function handleCreateClick(){
        if(numberQuiz<27){
            setNumberQuiz(numberQuiz+1)
            
        }
        
    }

    return(
        <>
            <div className="homepage">
                <header>
                    <h2>RING THE BELL</h2>
                </header>
                <div>
                    <div className="createstartplace">
                        <button onClick={handleCreateClick}>CREATE</button>
                        <button>START</button>
                    </div>
                    <div className="tr">
                        {renderQuizzes()}
                    </div>
                    
                    <div className="editplace">
                    <Link to="/edit">
                        <button>EDIT</button>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}