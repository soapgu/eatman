import React from 'react';

class Square extends React.Component {
    render()
    {
        let className;
        switch( this.props.category )
        {
            case "egg":
                className = "square egg";
                break;
            case "body":
                className = "square body";
                break;
            default:
                className = "square";
                break;
        }
        return ( <div className={className}></div> );
    }
}

export default Square