import React from 'react';
import * as axios from 'axios';


export class DronesWindow extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            drones: []
        }
    }    

    componentDidMount()
    {
        axios.get('http://localhost:3001/api/v1/drones/')
            .then((response) => {
                let data = response.data;
                if (data.status) {
                    let drones = data.data.map((drone) => {

                        drone.getTamanho = () => drone.tamanho.charAt(0).toUpperCase() + drone.tamanho.slice(1);
                        drone.getValor = (currency) => (`${currency ? currency : ''} ` + drone.preco).replace(/\./, ',')

                        return drone;
                    });
                    this.setState({ drones });
                }
            });
    }

    render()
    {
        return (
            <div className="col-xs-12 col-sm-12">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cor</th>
                            <th>Tamanho</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.drones.map((drone) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{drone.cor}</td>
                                        <td>{drone.getTamanho()}</td>
                                        <td>{drone.getValor('R$')}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}