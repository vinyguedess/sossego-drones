import React from 'react';
import * as axios from 'axios';


export class Table extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            total: 0,
            data: [],
            page: 1
        };

        this.loadData = this.loadData.bind(this);
        this.alternatePage = this.alternatePage.bind(this);
    }

    componentDidMount()
    {
        this.state.dataPerPage = this.props.dataPerPage || 10;

        if (this.props.ajaxfyUrl)    
            this.loadData();
    }

    renderHeader()
    {
        return (
            <thead>
                <tr>
                    {
                        this.props.columns.map((col) => {
                            return (
                                <th>{ typeof col === 'string' ? col : col.label }</th>
                            )
                        })
                    }
                </tr>
            </thead>
        );
    }

    renderFooter()
    {
        let totalPages = Math.ceil(this.state.total / this.state.dataPerPage),
            pages = [...Array(isNaN(totalPages) ? 0 : totalPages).keys()];

        return (
            <tfoot>
                <tr>
                    <td colSpan={this.props.columns.length} className="text-right">
                        {
                            pages.map((page) => {
                                return (
                                    <a href="#" className="btn btn-primary" disabled={ this.state.page === page + 1 } onClick={this.alternatePage} data-page={page + 1}>
                                        {page + 1}
                                    </a>
                                )
                            })
                        }
                    </td>
                </tr>
            </tfoot>
        );
    }

    render()
    {
        return (
            <table className="table table-striped table-hover">
                {this.renderHeader()}
                <tbody>
                    {
                        this.state.data.map((item) => {
                            return (
                                <tr>
                                    {
                                        this.props.columns.map((col) => {
                                            return (
                                                col.render ?
                                                    <td>{col.render(item, this)}'</td>
                                                :
                                                    col.format ?
                                                        <td>{ col.format(typeof col === 'string' ? item[col] : item[col.name]) }</td>
                                                    :
                                                        <td>{ typeof col === 'string' ? item[col] : item[col.name] }</td>
                                            );
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
                {this.renderFooter()}
            </table>
        )
    }

    alternatePage(event)
    {
        event.preventDefault();

        this.state.page = parseInt(event.target.dataset['page']);
        this.loadData();
    }

    loadData(page)
    {
        axios.get(this.props.ajaxfyUrl, {
            params: { 
                limit: this.state.dataPerPage,
                offset: this.state.dataPerPage * (this.state.page - 1)
            }
        })
            .then((response) => {
                if (response.data.status)
                    this.setState({ total: response.data.data.total, data: response.data.data.resultSet });
            });
    }

    

}