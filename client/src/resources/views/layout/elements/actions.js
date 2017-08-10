import React from 'react';


class Button extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            type: 'primary'
        }

        this.treatClick = this.treatClick.bind(this);
    }

    treatClick(event)
    {
        let dataSet = {}

        Object.keys(this.props)
            .filter((key) => key.substr(0, 5) === 'data-')
            .forEach((key) => {
                if (key.substr(0, 5) === 'data-')
                    dataSet[key.substr(key.indexOf('-') + 1)] = this.props[key];
            });

        if (this.props.onClick)
            return this.props.onClick(event, dataSet);
    }

    render()
    {
        return (
            <button className={ `btn btn-${this.state.type}` } title={this.props.title || "Delete"} onClick={ this.treatClick } disabled={ this.props.disabled || false }>
                { this.state.icon } { this.state.content }           
            </button>
        )
    }

}


export class Delete extends Button
{

    componentDidMount()
    {
        this.setState({ type: 'danger' });
        this.setState({ icon: <i className="fa fa-trash-o"></i>, content: '' });
    }

}


export class Update extends Button
{

    componentDidMount()
    {
        this.setState({ type: 'primary' });
        this.setState({ icon: <i className="fa fa-edit"></i>, content: '' });
    }

}


export class Submit extends Button
{

    componentDidMount()
    {
        this.setState({ type: 'success' });
        this.setState({ 
            icon: <i className="fa fa-save"></i>,
            content: "Enviar"
         });
    }

}