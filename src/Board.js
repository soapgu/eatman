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
                                        const sqClassname = ri === this.props.egg.y && ci === this.props.egg.x ? "square egg": "square";
                                        return ( <div key={ci} className={sqClassname}></div> );
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