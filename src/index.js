import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board"
import './index.css';

class Game extends React.Component 
{
  constructor(props)
  {
      super(props);
      this.state = {date: new Date()};
      window.addEventListener("keyup" , (e)=> this.keyboardUp(e) );
  }

  start()
  {
      if( !this.timerID )
      {
        this.timerID = setInterval( ()=>this.tick(), 1000);
      }
      else
      {
        clearInterval(this.timerID);
        this.timerID = null;
      }
  }

  end()
  {
      if(this.timerID)
      {
        clearInterval(this.timerID);
        this.timerID = null;
      }
  }

  tick()
  {
      this.setState({ 
        date: new Date()
      });
  }

  render()
  {
      return (
        <div className='game'>
          <Board column={10} row={10}></Board>
          <div className='game-info'>
            <h2>{this.state.date.toLocaleTimeString()}</h2>
            <button onClick={()=>this.start()}>Start</button>
         </div>   
        </div>
      );
  }

  keyboardUp(e)
  {
    console.log(e.key);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);
