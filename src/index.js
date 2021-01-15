import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board"
import './index.css';

class Game extends React.Component 
{
  constructor(props)
  {
      super(props);
      this.state = {
                    step: 0,
                    egg:{ 
                          x: 5, 
                          y: 5
                        },
                    direction:"right"
                   };
      
      this.width = 20;
      this.height = 20;
  }

  componentDidMount() 
  {
    window.addEventListener("keyup" , (e)=> this.keyboardUp(e) );
  }

  start()
  {
      if( !this.timerID )
      {
        this.setState({ 
          step: 0
        });
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
      this.setState(
        (state,props) => {
          let moveY = 0;
          let moveX = 0;
          switch( this.state.direction )
          {
              case "up":
                moveY = -1;
                break;
              case "down":
                moveY = 1;
                break;
              case "left":
                moveX = -1;
                break;
              case "right":
                moveX = 1;
                break;
              default:
                break;
          }

          const targetX = this.state.egg.x + moveX;
          const targetY = this.state.egg.y + moveY;

          console.log( "targetX:" + targetX );
          console.log( "targetY:" + targetY );

          if(  targetX >= 0 && targetX < this.width && targetY >= 0 && targetY < this.height) 
          {
            return {
              step: state.step + 1,
              egg: 
              {
                x:targetX,
                y:targetY
              }
            }
          }

          this.end();
          return;
        }
      );
  }

  render()
  {
      return (
        <div className='game'>
          <Board column={this.width} row={this.height} egg={this.state.egg}></Board>
          <div className='game-info'>
            <h2>{this.state.step}</h2>
            <button onClick={()=>this.start()}>Start</button>
         </div>   
        </div>
      );
  }

  keyboardUp(e)
  {
    console.log(e.key);
    let targetDirection
    switch(e.key)
    {
        case "ArrowUp":
          targetDirection = "up";
          break;
        case "ArrowDown":
          targetDirection = "down";
          break;
        case "ArrowLeft":
          targetDirection = "left";
          break;
        case "ArrowRight":
          targetDirection = "right";
          break;
        default:
          break;
    }
    if( targetDirection )
      console.log( "set direction:" + targetDirection );
      this.setState( {
        direction : targetDirection
      } );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);
