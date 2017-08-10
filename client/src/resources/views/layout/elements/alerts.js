import React from 'react';


export class Warning extends React.Component
{

    render()
    {
        return (
            <div className="alert alert-danger">
                <ul>
                    { 
                        this.props.warnings.map((w) => <li>{w}</li>)
                    }
                </ul>
            </div>
        );
    }

}