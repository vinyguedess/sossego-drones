import React from 'react';
import * as axios from 'axios';
import { Table } from './../layout/elements';
import { Warning } from './../layout/elements/alerts';
import { Delete, Update, Submit } from './../layout/elements/actions';


export class DronesWindow extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            warnings: null,

            drone: {
                id: null,
                color: '',
                size: '',
                value: '00,00',
                photo: ''
            },
            isSendingData: false,

            droneSizes: [
                { 'label': "Pequeno", 'value': "pequeno" },
                { 'label': "Médio", 'value': "medio" },
                { 'label': "Grande", 'value': "grande" }
            ],
            
            dataPerPage: 5,
            total: 0,
            drones: null
        }

        this.currencify = this.currencify.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.delete = this.delete.bind(this);
        this.fillForm = this.fillForm.bind(this);
        this.savingDrone = this.savingDrone.bind(this);
    }    

    savingDrone(event)
    {
        event.preventDefault();

        this.setState({ isSendingData: true });

        let url = 'http://localhost:3001/api/v1/drones',
            params = { 
                drone: {
                    cor: this.state.drone.color,
                    tamanho: this.state.drone.size,
                    preco: this.state.drone.value
                } 
            },
            config = { timeout: 5000 };

        if (this.state.drone.photo)
            params.drone.foto = this.state.drone.photo

        params.drone.preco = parseFloat(params.drone.preco
            .replace(/\./gi, '')
            .replace(/,/, '.'));

        let promise = null;
        if (this.state.drone.id)
            promise = axios.put(`${url}/${this.state.drone.id}`, params, config);
        else
            promise = axios.post(url, params, config);

        promise
            .then((response) => {
                if (response.data.status)
                    this.setState({ 
                        drone: { photo: null, color: '', size: '', value: '00,00' },
                        imagePreviewUrl: null
                    });

                this.refs.table.loadData();
            })
            .catch((err) => {
                this.setState({ warnings: [err.message] });
            })
            .then(() => this.setState({ isSendingData: false }));
    }

    handleChange(event)
    {
        let target = event.target,
            name = target.name,
            value = target.type === 'checkbox' ? target.checked : target.value;

        let drone = Object.assign(this.state.drone, {
            [name]: value
        });
        this.setState({ drone });
    }

    handleImage(event)
    {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {            
            this.setState({
                drone: Object.assign(this.state.drone, { 
                    photo: reader.result.substr(reader.result.indexOf('base64,') + 7)
                }),
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    currencify(event)
    {
        let value = event.target.value;
        value = parseInt((value === '' ? '0' : value)
            .replace(/\./gi, '')
            .replace(/,/gi, ''), 10) + '';

        if (value.length === 1) value = '000' + value
        else if (value.length === 2) value = '00' + value
        else if (value.length === 3) value = '0' + value

        value = value.substr(0, value.length - 2)
                .split('')
                .reverse()
                .map((v, i) => i > 0 && i % 3 === 0 ? v + '.' : v)
                .reverse()
                .join('') +
                `,${value.substr(-2)}`;
                
        let drone = Object.assign(this.state.drone, {
            value: value
        });
        this.setState({ drone });
    }

    form()
    {
        return (
            <form onSubmit={this.savingDrone}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3">
                        <div className="col-xs-12 col-sm-6">
                            <label>Imagem</label>
                            <input type="file" className="form-control" onChange={this.handleImage} />
                        </div>
                        <div className="col-xs-12 col-sm-6 text-center" style={ { background: '#F4F4F4', margin: '10px 0'} }>
                            { 
                                this.state.imagePreviewUrl ? 
                                    <img src={this.state.imagePreviewUrl} width="100%" />
                                : 
                                    'Image Preview' 
                            }
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-3">
                        <label>Cor</label>
                        <input type="text" className="form-control" name="color" disabled={this.state.isSendingData} value={this.state.drone.color} onChange={this.handleChange} />
                    </div>

                    <div className="col-xs-12 col-sm-3">
                        <label>Tamanho</label>
                        <select className="form-control" name="size" disabled={this.state.isSendingData} value={this.state.drone.size} onChange={this.handleChange}>
                            <option>None</option>
                            { this.state.droneSizes.map((size) => <option key={size.value} value={size.value}>{size.label}</option>) }
                        </select>
                    </div>

                    <div className="col-xs-12 col-sm-3">
                        <label>Valor</label>
                        <input type="text" className="form-control" name="value" disabled={this.state.isSendingData} value={this.state.drone.value} onChange={this.currencify} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 text-right">
                        <Submit title="Save" />
                    </div>
                </div>
            </form>
        );
    }

    fillForm(event, dataset)
    {
        this.setState({ 
            drone: {
                id: dataset.item.id || null,
                color: dataset.item.cor || null,
                size: dataset.item.tamanho || null,
                value: (dataset.item.preco + '' || '00,00').replace(/\./, ',')
            }
        });
    }

    delete(event, dataset)
    {
        axios.delete(`http://localhost:3001/api/v1/drones/${dataset.item.id}`)
            .then((response) => {
                if (!response.data.status)
                    this.setState({ warnings: [response.data.message] });

                this.refs.table.loadData();
            })
            .catch((err) => {
                this.setState({ warnings: [err.message] });
            });
    }

    listing()
    {
        let columns = [
            { label: 'ID', name: 'id' }, 
            { 
                label: 'Foto', 
                name: 'foto',
                format: (value) => <img src={value} alt={ `Drone` } style={
                    { 'width': '50px', 'height': '50px' }
                } />
            },
            { label: 'Color', name: 'cor' },
            { label: 'Size', name: 'tamanho', format: (value) => value.charAt(0).toUpperCase() + value.slice(1) },
            { label: 'Prize', name: 'preco', format: (value) => 'R$ ' + (value.toFixed(2) + '').replace(/\./g, ',') },
            {
                label: "Actions",
                render: (drone, table) =>
                {
                    return (
                        <span>
                            <Update onClick={this.fillForm} data-item={ drone } />
                            <Delete onClick={this.delete} data-item={ drone } />
                        </span>
                    );
                }
            }
        ];

        return <Table ref="table" key={'table-1'} ajaxfyUrl="http://localhost:3001/api/v1/drones" columns={ columns } />;
    }

    render()
    {
        return (
            <div className="col-xs-12 col-sm-12">
                { this.state.warnings ? <Warning warnings={this.state.warnings} /> : "" }

                <div className="row">
                    <div className="col-xs-12">
                        {this.form()}
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-xs-12">
                        {this.listing()}
                    </div>
                </div>
            </div>
        )
    }

}