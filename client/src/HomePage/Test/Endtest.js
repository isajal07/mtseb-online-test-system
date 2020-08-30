import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import {history} from '../../_helpers'
import { testActions } from "../../_actions";

const Endtest = (props) => {
    let {id, teacher,subject, classNo, questions, yourAnswer } = props.test.test
    let testId = id
    let quiz = props.questions;

    let wrongAnswers = props.wrongAnswers();
    let rightAnswers = quiz.length-wrongAnswers.length;
    let score = rightAnswers
    let total = quiz.length
    let yourAns

    //Handling the empty array if student did not attempt single questions, By assuming the answer 0. 
    (props.yourAnswer === "") ? 
        yourAns = 0  
        :
        yourAns = props.yourAnswer.map(a=>a+1)
    
    

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(testActions.submitScore(testId, score, total))
    }
    // props.sendData(testId, score, total)
    
    //Sending the data to Parent(Test) if time out
    

    return(

        <div className="QuestionResults">
            <div className="column">
               <div>
                   <h1>END OF THE TEST!</h1>
                   
                   <Link to={{
                       pathname: '/result',
                       state:{teacher,subject,classNo,questions ,rightAnswers, yourAns, quiz,}
                   }}><Button onClick={handleClick} >VIEW RESULT</Button></Link>
               </div>
            </div>
        </div>
    )

}

export default Endtest;