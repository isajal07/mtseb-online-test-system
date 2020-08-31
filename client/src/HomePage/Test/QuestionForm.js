import React, { Component, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio, Modal } from 'semantic-ui-react'
import QuestionButtons from './QuestionButtons';

export default function Questionform({questions,index,answers,changeAnswers})  {
    const [open, setOpen] = useState(false)

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
                         <h3>{questions[index].question}</h3>
                         {
                             questions[index].image ? 
                             
                             <Modal
                  closeIcon
                  open={open}
                  trigger={<img className='file-image'  src={questions[index].image}/>}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  style={{backgroundColor:'rgb(230, 225, 225)'}}
            >
               <center> <img className='file-image-large'  src={questions[index].image}/> </center>
            </Modal>
                             :null
                         }
                    </Form.Field>
                    {ques}

                </Form>
            </div>
        )
    
}
