const teachercard = (name,username,password) => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          *, *:before, *:after {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Nunito', sans-serif;
            color: #384047;
          }
          
          form {
            max-width: 300px;
            margin: 10px auto;
            padding: 10px 20px;
            background: #f4f7f8;
            border-radius: 8px;
          }
          
          h1 {
            margin: 0 0 30px 0;
            text-align: center;
          }
          
          input[type="text"],
          input[type="password"],
          input[type="date"],
          input[type="datetime"],
          input[type="email"],
          input[type="number"],
          input[type="search"],
          input[type="tel"],
          input[type="time"],
          input[type="url"],
          textarea,
          select {
            background: rgba(255,255,255,0.1);
            border: none;
            font-size: 16px;
            height: auto;
            margin: 0;
            outline: 0;
            padding: 15px;
            width: 100%;
            background-color: #e8eeef;
            color: #8a97a0;
            box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
            margin-bottom: 30px;
          }
          
          input[type="radio"],
          input[type="checkbox"] {
            margin: 0 4px 8px 0;
          }
          
          select {
            padding: 6px;
            height: 32px;
            border-radius: 2px;
          }
        
          
          fieldset {
            margin-bottom: 30px;
            border: none;
          }
          
          legend {
            font-size: 1.4em;
            margin-bottom: 10px;
          }
          
          label {
            display: block;
            margin-bottom: 8px;
          }
          
          label.light {
            font-weight: 300;
            display: inline;
          }
          
          @media screen and (min-width: 480px) {
          
            form {
              max-width: 480px;
            }
          
          }
          
          </style>
       </head>
       <body>
        <div class="row">
      <div class="col-md-12">
        <form action="index.html" method="post">
          <h1> Mount SEB School </h1>
          <h2> <center> Online Test registration.</center></h2>
          
          <fieldset>
            
   
          -------------------------
            <label for="name"><b>Name:</b> ${name}</label>
            
          
            <label for="email"><b>Username:</b> ${username}</label>
          
    
            <label for="password"><b>Password:</b> ${password}</label>
            *Note: Please don't share your password. Keep this file safe with you.
        
      </body>
       </body>
    </html>
    `
  };
  
  
  
  module.exports = teachercard