import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import CALCULATOR from './calculator';
import HISTORY from './history';

class Home extends React.Component {
    render() {
      type TextAlign = "end" | "left" | "center" | "right" | "start" | undefined;
      
      //styling the buttons
    const styleButton = {
      width: "120px",
      padding:"15px",
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
         height: "50vh",
         
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
            <h1 style={headline}>Welcome to the Calculator App</h1>
            <p style={textStyle}>This is a simple calculator app that can be used to calculate the arithmetic oprations like addition, subtraction, multiplication and division using RESTAPI.</p>
            
           <div style={{textAlign:"center"}}>    
                  <Link to="/calculator">
                     <Button style={styleButton}>CALCULATOR</Button>
                    </Link>
                 <Link to="/history">
                     <Button style={styleButton}>HISTORY</Button>
                    </Link>
           </div>
          </div>
         </section> 
         );
    }
}

class App extends React.Component {
  render() 
  {
    //styling the buttons
    const styleButton = {
      width: "120px",
      padding:"15px",
      margin:"5px", 
      borderRadius: "10px",
      border: "5px solid DodgerBlue",
      display: "inline-block",
      textAlign: "center",
      fontFamily: "Arial",
      fontSize: "12px",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "DodgerBlue",
      
    };
     return(
        <HashRouter >
           <div>
               <nav style={{textAlign:"center"}}>
               <Link to="/">
                     <Button style={styleButton}>HOME</Button>
                  </Link>      
                  <Link to="/calculator">
                     <Button style={styleButton}>CALCULATOR</Button>
                    </Link>
                 <Link to="/history">
                     <Button style={styleButton}>HISTORY</Button>
                    </Link>
               </nav>
                 
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/calculator" component={CALCULATOR}/> 
                <Route path="/history" component={HISTORY}/>
            </div>
           </div>
        </HashRouter>
     );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));