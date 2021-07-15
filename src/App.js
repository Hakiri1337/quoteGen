import Qoute from './components/Quote';
import Author from './components/Author';
import  Tweet from './components/Tweet';
import './App.css';
import React, { useEffect,useCallback,useState } from 'react';

function App() {   
  let value1 = Math.floor(Math.random() * 30); 
  const [quote,setQuote] = useState(""); 
  const [author,setAuthor] = useState(""); 

 
  

  const randomQoute = useCallback(() =>{

    fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=50').
    then(response=>response.json()).
    then(data =>{ 
                 
                 setAuthor(data.quotes[0].author)
                  setQuote(data.quotes[0].text)
                }
        )
        
  },[value1])

   useEffect(function effectFunction() {
    fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=1')
        .then(response => response.json())
        .then(data =>  {setQuote(data.quotes[0].text)
                       setAuthor(data.quotes[0].author)
        });
}, []);

const enableButton = (timer) => {
  document.getElementById("button").disabled = false;
  clearInterval();
}
const disableButton =  () => {
  document.getElementById("button").disabled = true
    setInterval(enableButton(),1000)

}

const randomColor = useCallback(() =>{

  fetch('http://api.creativehandles.com/getRandomColor').
  then(response=>response.json()).
  then(data =>{document.body.style['background']=data.color
  document.body.style['transition']='background-color 2s ease-out'

              }
      )
      
},[]) 
 
  const functionWraper =  () =>{
      disableButton()
     randomColor()
     randomQoute()

  }
 



  return (
  
    <div className="container">
        
                <Qoute quote={quote}/>
                 <Author author={author}/>
                 
             <button type="button" disabled={false} id="button" onClick={functionWraper}>Change Quote</button>
             <Tweet  quote={quote} author={author}/>

            
    </div>)
    
}

export default App;
