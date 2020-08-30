


import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import './Test.css';
import QuestionHeader from './QuestionHeader';
import { Divider,Segment,Button } from 'semantic-ui-react';
import QuestionForm from './QuestionForm';
import QuestionButtons from './QuestionButtons';
import Endtest from './Endtest'
import TestResult from './TestResult'
import { userActions, testActions } from '../../_actions';
import { NavBar, Footer} from '../../_components'
import { history } from '../../_helpers';
import { StudentClock } from '../../CreateTestPage/StartClock';

export default function Test (props)  {

    const {classNo, roll,name, role} = useSelector(state => state.authentication.user);
    const [loading, setLoading] = useState(
        useSelector((state) => state.test.loading)
      );
    // const test = useSelector(state => state.test.testByClass[0])
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch();
    useEffect(() => {
        // window.location.reload(false);
        dispatch(testActions.getTestByClass(classNo))
        setLoading(false);
    }, []);

    const test = props.history.location.state
    const [index,setIndex] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const [windowWidth, setWindowWidth] = useState(null)
    const [answers, setAnswers] = useState('')
    const [disabled, setDisabled] = useState(false)
    const questions = test.test.questions
    
    const [quiz, setQuiz] = useState(questions)
    
    const endQuiz = () => {
        setIsActive(false)
        console.log("ENDER QUIZ")
       
    }
    
    const incrementIndex = () => {
        setIndex(index + 1)
        console.log("increment")
    //    setDisabled(true)
   }


   const decrementIndex = () => {
        setIndex(index - 1)
        console.log("decrement")
    }

   const changeAnswers = (value,index) => {

    let tempArray = [...answers];
    tempArray[index] = value;
    
    
    setAnswers(tempArray)
    }

  const wrongAnswers = () => {
    const wrongAnswers = quiz.filter((item,index) => {

           return item.correctAnswer !== answers[index] || item.correctAnswer === null;
       })
        return wrongAnswers;
    }

    //Datas to submit test after time up
    const testId = test.test.id
    const total = test.test.questions.length
    let wrongAns = wrongAnswers();
    let rightAns = quiz.length-wrongAns.length;
    let score = rightAns

    let yourAns

    //Handling the empty array if student did not attempt single questions, By assuming the answer 0. 
    (answers === "") ? 
        yourAns = 0  
        :
        yourAns = answers.map(a=>a+1)
    
    //Datas to pass to the result table
    const teacher = test.test.teacher
    // const classNo =test.test.classNo
    const subject =test.test.subject
    // const questions= test.test.teacher.questions
    const rightAnswers = score

    const lengthoftest = test.test.answers
   
console.log(test.test.answers.map(a=>a.name.answers))
    
    useEffect(()=>{
        setTimeout(()=>{

                // console.log((test.test.answers.some(a=>a.name === name)))
            dispatch(testActions.submitScore(testId,total,score))
            history.push({pathname:'/result', state:{teacher,subject,classNo,questions ,rightAnswers, yourAns} })

        },15000 )
    }
    ,[])
    
    console.log((test.test.answers.some(a=>a.name === name)))



//    console.log('teacher=>>',test.test.teacher)
//    console.log('subject=>>',test.test.subject)
//    console.log('classNo=>>',test.test.classNo)
//    console.log('questions=>>',test.test.questions)
//    console.log('rightAnswers==>',score)
   console.log('yourAns==>',yourAns)
    

    
        return (
            <>
                <NavBar name={name} classNo={classNo} roll={roll}/>
            <div className="Question">
                   {loading?
                   <p>Loading...</p>
                   : alert.message !== undefined?
                   <center>
                       <Button
                       style={{margin:'40px'}}
                       inverted
                  onClick={()=>history.push('/shome')}
                    color='brown'
                  icon="left chevron"
                  content="Go back"
                    />
                   </center>:
                   <Segment>
                        {
                            isActive ?
                            <div>
                                <StudentClock/>
                                <QuestionHeader header={test.test}/>
                                < Divider />
                                < QuestionForm questions={quiz}
                                index={index}
                                answers={answers}
                                changeAnswers={changeAnswers}
                                />
                                <Divider/>
                                <QuestionButtons index={index}
                                incrementIndex={incrementIndex}
                                decrementIndex={decrementIndex}
                                windowWidth={windowWidth}
                                questions={quiz}
                                endQuiz={endQuiz}
                                disabled={disabled}
                                />
                            </div> : null
                        }

                        {
                            isActive === false ?
                                <div>
                                    <Endtest wrongAnswers={wrongAnswers}
                            questions={quiz} test={test} yourAnswer={answers} />
                                    
                                </div> : null
                        }
                    </Segment>
                    
                    }
                    <Footer/>
                </div>
                    </>
        )
    
}

