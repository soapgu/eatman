import React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() 
    {
        return (
            <div className="board">
                {
                    Array(this.props.row).fill(null).map( (_r, ri) => 
                    {
                        return ( 
                            <div key={ri} className="board-row">
                                {
                                    Array(this.props.column).fill(null).map( (_c,ci) =>
                                    {
                                        const category = this.getCategory( ci,ri );
                                        return ( <Square key={ci} category={category}></Square> );
                                    } ) 
                                }
                            </div>);
                    } )
                }
            </div>
        );
    }

    getCategory( x , y )
    {
        if( y === this.props.egg.y && x === this.props.egg.x )
            return "egg";
        return this.props.body.some( t => t.x === x && t.y === y ) ? "body":"blank";
    }
}

export default Board