import "./scss/playpage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuizCount,
  setFlagment,
  increaseChooseCorrect,
} from "../../Global/counter/quizSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PlayPage() {
  const [team, setTeam] = useState("0");
  const quizes = useSelector((state) => state.quizes.quizes);
  const quizCount = useSelector((state) => state.quizes.quizCount);
  const dispatch = useDispatch();

  function handleChooseAnswer(e, a) {
    const element = e.currentTarget;

    if (quizes[quizCount].correctAnswer === a) {

      postResult(a,"CORRECT")


      dispatch(increaseChooseCorrect());
      element.classList.add("correct");
    } else {
      postResult(a,"UNCORRECT")
      element.classList.add("uncorrect");
    }
  }

  function postResult(answer,result){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team:team, question:quizes[quizCount].question, answer:answer, correct:result })
    };
    fetch('http://localhost:8000/postResult', requestOptions)
  }

  function resetAnswerClasses() {
    const answerElements = document.querySelectorAll(
      ".answerA, .answerB, .answerC, .answerD"
    );
    answerElements.forEach((element) => {
      element.className = element.className
        .replace("correct", "")
        .replace("uncorrect", "");
    });
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  };
  function resetTeam() {
    fetch('http://localhost:8000/resetTeam', requestOptions);
  }

  function fetchAPI() {
    fetch("http://localhost:8000/getTeam")
      .then((res) => res.json())
      .then((teamChoose) => {
        setTeam(teamChoose.team);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    dispatch(setFlagment());
    setInterval(() => {
      fetchAPI();
    }, [500]);
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
          <div>TEAM {team}</div>
          <Link to={quizCount === quizes.length - 1 ? "/finish" : "/play"}>
            <button
              className="next-button"
              onClick={() => {
                resetTeam();
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
