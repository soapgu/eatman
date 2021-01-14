import React from 'react';

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
                                        return ( <div key={_c} className="square"></div> );
                                    } ) 
                                }
                            </div>);
                    } )
                }
            </div>
        );
    }
}

export default Board