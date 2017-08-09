import React from 'react';
import logo from './../../assets/images/logo.svg';
import './../../assets/css/style.css';
import { DronesWindow } from './../drones';


class Header extends React.Component
{
    render()
    {
        return (
            <div className="App-header">
                <h2>
                    <img src={logo} className="App-logo" alt="logo" />
                    <span>Welcome to React</span>
                </h2>
            </div>
        );
    }
}


class Footer extends React.Component
{
    render()
    {
        return (
            <div className="App-footer">
                &copy; Todos os direitos reservados {new Date().getFullYear()}
            </div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="App-content">
                    <DronesWindow />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
