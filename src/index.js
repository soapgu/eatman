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
                          x: 12, 
                          y: 12
                        },
                    body:
                    [
                      { x:9, y:5 },
                      { x:8, y:5 },
                      { x:7, y:5 },
                      { x:6, y:5 },
                      { x:5, y:5 }
                    ],
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

          const targetX = this.state.body[0].x + moveX;
          const targetY = this.state.body[0].y + moveY;
          //console.log( "targetX:" + targetX );
          //console.log( "targetY:" + targetY );
          //targetX >= 0 && targetX < this.width && targetY >= 0 && targetY < this.height
          const live = this.checkLive(targetX , targetY , this.state.body );
          if( live ) 
          {  
            if( targetX === this.state.egg.x && targetY === this.state.egg.y )
            {
              var newBody = [{x:targetX,y:targetY}].concat( this.state.body.slice() );
              const nEgg = this.createEgg(newBody);
              return {
                step: state.step + 1,
                body: newBody,
                egg: nEgg
              }
            }
            return {
              step: state.step + 1,
              body: [{x:targetX,y:targetY}].concat( this.state.body.slice(0,this.state.body.length-1) )
            }
            
          }

          this.end();
          return;
        }
      );
  }

  checkLive( targetX , targetY , body )
  {
      if( targetX >= 0 && targetX < this.width && targetY >= 0 && targetY < this.height )
      {
          var touchBody = body.some( t=> t.x === targetX && t.y === targetY );
          if( touchBody )
            return false;
          return true;
      }
      return false;
  }

  createEgg(body)
  {
    const blankArea = [];
    for(let r=0;r<this.height;r++)
    {
      for(let c=0;c<this.width;c++)
      {
        var occupy = body.some( t=> t.x === c && t.y === r );
        if( !occupy )
          blankArea.push( {x:c,y:r} );
      }
    }
    const randomIndex = Math.floor(Math.random() * blankArea.length);
    return blankArea[randomIndex];
  }

  render()
  {
      return (
        <div className='game'>
          <Board column={this.width} row={this.height} 
                 egg={this.state.egg}
                 body={this.state.body}></Board>
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
