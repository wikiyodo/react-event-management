import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { HOME, LOGOUT } from '../dist/routes';
import Authentication from '../helpers/auth';

export default class Header extends Component{
    
    state = {
        loggedIn: false
    };

    constructor(props){
        super(props);
        this.state.loggedIn = props.loggedIn;
    }

    componentWillReceiveProps({loggedIn}){
        if(loggedIn !== this.state.loggedIn)
            this.setState({loggedIn});
    }

    renderLogout = () => {
        if(this.state.loggedIn)
            return (
                <li className="nav-item"><Link className="nav-link" to={LOGOUT}>Logout</Link></li>
            );
    };

    render(){
        return (
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container box_1620">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <ul className="nav navbar-nav menu_nav ml-auto">
                                    <li className="nav-item active"><Link className="nav-link" to={HOME}>Home</Link></li> 
                                    <li className="nav-item"><a className="nav-link" href="#">About</a></li> 
                                    <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                                    { this.renderLogout() }
                                </ul>
                            </div> 
                        </div>
                    </nav>
                </div>
            </header>
            );
    }
}