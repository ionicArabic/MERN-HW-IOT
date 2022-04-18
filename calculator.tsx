import * as React from 'react';
import { useState } from "react";

function MyForm() {
  
  const [numbers, setInputs] = useState({
    number1: '',
    number2: '',
    operation: '',
    });
    
  const [result, setResult] = useState('');
  const [err, setErr] = useState('');
    
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
    setErr('');
    setResult('');
    console.log(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //setResult(Number(numbers.number1) + Number(numbers.number2));
    console.log(numbers);
    
    if (numbers.number1 === '' || numbers.number2 === '') {
      setErr('Please enter two numbers');
      
    } else {
      
    let request = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(numbers)
  }
    if (numbers.operation === 'add') { 
      fetch('http://localhost:3000/add', request).then( res => res.json() )
      .then( data => {
        console.log('data: ',data.result);
       setResult(data.result);
  
      })
      .catch( err => console.log(err) )
    
    } else if (numbers.operation === 'sub') { 
      fetch('http://localhost:3000/sub', request).then( res => res.json() )
      .then( data => {
        console.log('data: ',data.result);
       setResult(data.result);
  
      })
      .catch( err => console.log(err) )
    
    } else if (numbers.operation === 'mul') { 
      fetch('http://localhost:3000/mul', request).then( res => res.json() )
      .then( data => {
        console.log('data: ',data.result);
       setResult(data.result);
  
      })
      .catch( err => console.log(err) )
    
    } else if (numbers.operation === 'div') { 
      fetch('http://localhost:3000/div', request).then( res => res.json() )
      .then( data => {
        console.log('data: ',data.result);
       setResult(data.result);
  
      })
      .catch( err => console.log(err) )
    
    } else {
      setErr('Please select an operation');
      console.log('error');
    }
  
  }}
  return (<div style={{padding: 10}}>
     <form onSubmit={handleSubmit}>
      <label>Enter number1: 
      <input 
        type="number" 
        name="number1" 
        value={numbers.number1 || ""} 
        onChange={handleChange}
      />
      </label>
      <br />  <br />
      <label>Enter number2: 
        <input 
          type="number" 
          name="number2" 
          value={numbers.number2 || ""} 
          onChange={handleChange}
        />
        </label>
        <br />  <br />
        <input type="submit" />
        
        <h2>please select an operation:</h2>
        <div onChange={handleChange}>
        <input type="radio" value="add" name="operation" /> Addition
        <br />
        <input type="radio" value="sub" name="operation" /> Subtraction
        <br />
        <input type="radio" value="mul" name="operation" /> Multiplication
        <br />
        <input type="radio" value="div" name="operation" /> Division
      </div>
    </form> 
    <h1>Result: {result} </h1>
    <h3>{err}</h3>
  </div>
  )
}


class CALCULATOR extends React.Component {
  

   render() {
    type TextAlign = "end" | "left" | "center" | "right" | "start" | undefined;
    
    const homeStyle = {
       backgroundColor: "DodgerBlue",
       width: "80%",
       color: "white",
       fontFamily: "Arial",
       border: "2px solid black",
       fontSize: "14px",
       alignItems:'center',
       justifyContent:'center',
       
       
     };
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        align: "center",
      };
       return(<section style={{alignItems:'center',justifyContent:'center', display:'flex'}}>
          <div style={homeStyle}>
       <h1 style={mystyle}>Enter Two Numbers</h1>
       <MyForm />
     </div>
       </section>
      );
    }
}

export default CALCULATOR;