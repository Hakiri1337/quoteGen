import Qoute from './components/Quote';
import Author from './components/Author';
import  Tweet from './components/Tweet';
import './App.css';
import React, { useEffect,useCallback,useState } from 'react';

function App() {   
  let value1 = Math.floor(Math.random() * 150); 
  const [quote,setQuote] = useState(""); 
  const [author,setAuthor] = useState(""); 

 

  const randomQoute = useCallback(() =>{

    fetch('https://type.fit/api/quotes', {
      headers: { 'Content-Type': 'application/json',
   
  }}).
    then(response=>response.json()).
    then(data =>{ 
      if(data[value1].author===null){setAuthor((prevAuthor)=> prevAuthor="Anonim")}else{
                 setAuthor(data[value1].author)
                  setQuote(data[value1].text)}
                }
        )
        
  },[value1])

   useEffect(function effectFunction() {
    fetch('https://type.fit/api/quotes', {  
      headers: { 'Content-Type': 'application/json',
   
  }
})
        .then(response => response.json())
        .then(data =>  {setAuthor(data[value1].author)
                       setQuote(data[value1].text)
        });
}, []);

const enableButton = () => {
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
