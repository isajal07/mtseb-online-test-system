import React, { Component, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react'
import QuestionButtons from './QuestionButtons';

export default function Questionform({questions,index,answers,changeAnswers})  {

        let ques = questions[index].options.map((value,ind) => {
            
            return(
                <Form.Field key={ind}>

                    <Radio
                        label={value}
                        name='radioGroup'
                        value={ind}
                        checked={ind === answers[index]}
                        onChange={() => changeAnswers(ind,index)}
                    />
                </Form.Field>
            )
        })

        return (
            <div className={"QuestionForm"}>
                <Form>
                    <Form.Field>
                         <h4>{questions[index].question}</h4>
                    </Form.Field>
                    {ques}

                </Form>
            </div>
        )
    
}
