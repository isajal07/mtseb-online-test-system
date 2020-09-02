import React from 'react'
import { Message, Segment } from 'semantic-ui-react'

const TestRules = () => {
  // const list = [
  //   "Make sure the internet is connected through out the test, else your test will be cancelled if the connection cuts off during the test.",
  //   "Make sure there is an enough charge on your devices through out the test, else your test will be cancelled if the battery dies during the test.",
  //   "<b>DO NOT REFRESH THE PAGE while you are giving the test because the time will be restart, which is not the real time when the test was started.</b>",
  //   "Immediately start the test by clicking 'Start Test' as soon as you see it on your screen. The count down time will immediately start.",
  //   "<b> sure you submit the test before the time is up.</b>If you failed to submit the test by clicking on 'Submit Test' button before the countdown your test won't be submitted.",
  //   "<b>DO NOT FORGET TO LOGOUT from you finish viewing the result.</b>Else your test marks won't be saved.",

  // ]
  return (
    <Segment>
      <Message>
    <Message.Header>Welcome to Mt. SEB Standarized Online Test</Message.Header>
    <p>
      Here are the few things-to-knows and rules before you start the test:
    </p>
    <Message.List>
      <Message.Item>Make sure the internet is connected through out the test, else your test will be cancelled if the connection cuts off during the test. </Message.Item>
      <Message.Item>Make sure there is an enough charge on your devices through out the test, else your test will be cancelled if the battery dies during the test. </Message.Item>
      <Message.Item><b>DO NOT REFRESH THE PAGE while you are giving the test because the time will restart, which is not the real time when the test was started.</b></Message.Item>
      <Message.Item>Immediately start the test by clicking 'Start Test' as soon as you see it on your screen. The count down time will immediately start.</Message.Item>
      <Message.Item><b>Make sure you submit the test before the time is up.</b>If you failed to submit the test by clicking on 'Submit Test' button before the countdown your test won't be submitted. </Message.Item>
     <Message.Item><b>DO NOT FORGET TO LOGOUT from you finish viewing the result.</b>Else your test marks won't be saved.</Message.Item>
    <Message.Item>Please take the screenshot of your result and answers. The test and result all will be deleted shortly.</Message.Item>
    </Message.List><br/>
    <div><h4><center>---ALL THE BEST!---</center></h4></div>
  </Message>
  </Segment>
  )
}

export default TestRules