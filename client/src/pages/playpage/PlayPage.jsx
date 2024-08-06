import "./scss/playpage.css";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuizCount, setFlagment, increaseChooseCorrect } from "../../Global/counter/quizSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PlayPage() {
  const quizes = useSelector((state) => state.quizes.quizes);
  const quizCount = useSelector((state) => state.quizes.quizCount);
  const dispatch = useDispatch();

  function handleChooseAnswer(e, a) {
    const element = e.currentTarget;
    
    if (quizes[quizCount].correctAnswer === a) {
      dispatch(increaseChooseCorrect());
      element.classList.add("correct");
    } else {
      element.classList.add("uncorrect");
    }
  }

  function resetAnswerClasses() {
    const answerElements = document.querySelectorAll(".answerA, .answerB, .answerC, .answerD");
    answerElements.forEach(element => {
        element.className = element.className.replace("correct", "").replace("uncorrect", "");
    });
}

  useEffect(() => {
    dispatch(setFlagment());
  }, []);

  return (
    <>
      <div className="playpage">
        <header>
          <h2>
            {quizCount + 1}/{quizes.length}
          </h2>
        </header>
        <div className="question-place">{quizes[quizCount].question}</div>
        <div className="answer-place">
          <div className="answer-place-r1">
            <div
              className="answerA"
              onClick={(e) => handleChooseAnswer(e, "A")}
            >
              <div className="answer">
                <div>A.{quizes[quizCount].answerA}</div>
              </div>
            </div>
            <div
              className="answerB"
              onClick={(e) => handleChooseAnswer(e, "B")}
            >
              <div className="answer">
                <div>B.{quizes[quizCount].answerB}</div>
              </div>
            </div>
          </div>
          <div className="answer-place-r2">
            <div
              className="answerC"
              onClick={(e) => handleChooseAnswer(e, "C")}
            >
              <div className="answer">
                <div>C.{quizes[quizCount].answerC}</div>
              </div>
            </div>
            <div
              className="answerD"
              onClick={(e) => handleChooseAnswer(e, "D")}
            >
              <div className="answer">
                <div>D.{quizes[quizCount].answerD}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-place">
          <div>TEAM 4</div>
          <Link to={quizCount === quizes.length - 1 ? "/finish" : "/play"}>
            <button
              className="next-button"
              onClick={() => {
                resetAnswerClasses();
                dispatch(increaseQuizCount());
              }}
            >
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
