import "./scss/finishpage.css"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {resetCache} from '../../Global/counter/quizSlice'

export function FinishPage(){
    const quizes = useSelector((state) => state.quizes.quizes);
    const chooseCorrect = useSelector((state) => state.quizes.chooseCorrect);
    const dispatch = useDispatch();
    return(
        <>
            <div className="finishpage">
                <div>CORRECT: {chooseCorrect}/{quizes.length}</div>
                <div>THANK FOR USING RING THE BELL</div>
                <div>
                    <Link to={"/"}>
                        <button onClick={()=>{
                            dispatch(resetCache())
                        }}>END</button>
                    </Link>
                    
                </div>
            </div>
        </>
    )
}