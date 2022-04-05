import * as React from 'react';
import { useState } from "react";
import { Button } from 'semantic-ui-react';
import * as ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';


class HISTORY extends React.Component<any, any> {
    
    constructor(props) {
        super(props);
        this.state = {
          historyOperations: [],
          historyByDate: [],
          historyByOperation: [],
          byDate: {'date': '2022-03-30T15:54:35.659Z'},
          byOperation: {'operation': '+'},
        };
        this.byDateClick = this.byDateClick.bind(this);
      }
    
      byDateClick() {
        
        let request = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.byDate)
      }
      fetch('http://localhost:3000/bydate', request)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          this.setState({
              historyByDate: data
          });
          
      })
      
      .catch(err => console.log(err));
      
  }
  
  byOperationClick() {
        
    let request = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.byOperation)
  }
  fetch('http://localhost:3000/byoperation', request)
  .then(res => res.json())
  .then(data => {
      console.log(data);
      this.setState({
          historyByOperation: data
      });
      
  })
  
  .catch(err => console.log(err));
  
}
      
    componentDidMount() {
        
        fetch('http://localhost:3000/history')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                historyOperations: data
            });
              
        })
        .catch(err => console.log(err));
    }
     
    render() {
        type TextAlign = "end" | "left" | "center" | "right" | "start" | undefined;
      
      //styling the buttons
    const styleButton = {
      width: "240px",
      padding:"5px",
      margin:"5px", 
      borderRadius: "10px",
      border: "2px solid black",
      display: "inline-block",
      textAlign: "center",
      fontFamily: "Arial",
      fontSize: "12px",
      fontWeight: "bold",
      color: "black",
      backgroundColor: "white",};
      
      const headline = {
        textAlign: 'center' as TextAlign, // <-- the magic
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 0,
        backgroundColor: 'white',
        color: 'black',
        padding: '10px',
      }
      
      // styling h1 tag
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
         // stylig the photo
       const textStyle = {
        color: "white",
        fontFamily: "Arial",
        fontSize: "14px",
        padding: "10px",
               
       };
       return(
       <section style={{alignItems:'center',justifyContent:'center', display:'flex'}}>
          <div style={homeStyle}>
          <div>
            <h1 style={headline}>History</h1>
          </div>
          <h1 style={{padding: 10}}> Latest operation: </h1>
          <ul>
          {this.state.historyOperations.map(opr => {
              let localDate = new Date(opr.createdAt);
                let date = localDate.toLocaleDateString();
                let time = localDate.toLocaleTimeString();
                
            return <li key={`${opr._id}`}>
                Date: {date},
                Time: {time},
                Operation: {opr.operation},
                Number1: {opr.firestNumber}, 
                Number2: {opr.secondNumber},
                Result: {opr.result}
                </li>
          })}
        </ul>
        
        <h1 style={{padding: 10}}> Operation by operation : </h1>
          <ul>
          {this.state.historyByOperation.map(opr => {
              let localDate = new Date(opr.createdAt);
                let date = localDate.toLocaleDateString();
                let time = localDate.toLocaleTimeString();
                
            return <li key={`${opr._id}`}>
                Date: {date},
                Time: {time},
                Operation: {opr.operation},
                Number1: {opr.firestNumber}, 
                Number2: {opr.secondNumber},
                Result: {opr.result}
                </li>
          })}
        </ul>
        
        <div style={{alignItems:'center',justifyContent:'center', display:'flex'}}>
        <Button style={styleButton}  onClick={() => {
  this.byDateClick()
  }}>Show operations on spacific Date</Button>
  <Button style={styleButton}  onClick={() => {
  this.byOperationClick()
  }}>Show operations on spacific Operation</Button>
          </div>   
          </div>
         </section> 
         );
}}

export default HISTORY;