import React, {Component} from 'react';
import { HOME, REGISTRATION } from '../../dist/routes';
import { Redirect, Link } from 'react-router-dom';
import Controller from '../controller';
import { REQUEST_LOGIN } from '../../requests/account';
import { getBody } from '../../requests';
import Authentication from '../../helpers/auth';

export default class LoginPage extends Controller{
    
    state = {
        loading: false,
        errors: {},
        successMessage:"",
        errorMessage:"",
        loginSuccess: false,
    };

    submitLogin = (e) => {
        // prevent default form action
        e.preventDefault();
        let email_ = this.refs.email;
        let password_ = this.refs.password;

        let email = email_.value;
        let password = password_.value;
        

        REQUEST_LOGIN({ email, password }, (err, res) => {
            if(err){

                this.setError("Could not connect to the internet "+err.message);
                return;
            }

            let body = getBody(res);
            
            if(body.status){
                // unset fields
                (new Authentication).setApiKey(body.extras.apiKey, body.extras.user);
                this.props.onLogin();
                this.setState({loginSuccess:true});
                return;
            }
            
            this.setError(body.message);
            this.setFieldErrors(body.extras);
        });
    };

    render(){

        if(this.state.loginSuccess)
            return <Redirect to={{
                pathname:HOME,
            }} />;

        let {loading} = this.state;

        return(
            <section className="home_banner_area">
                <div className="banner_inner" style={{paddingTop:"0"}}>
                    <div className="container">
                        <div className="banner_content">
                        <h2>LOGIN PAGE</h2>
                        <p>Manage your events seamlesly</p>	
                            <div className="row">	
                                <div className="col-lg-6 offset-lg-3">
                                    <div id="mc_embed_signup">
                                        <form style={{textAlign: "left"}} onSubmit={this.submitLogin}>
                                            {this.renderError()}
                                            {this.renderSuccess()}
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input ref="email" type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Password:</label>
                                                <input ref="password" type="password" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                            <button className="btn btn-info tickets_btn" disabled={loading}>{ !loading ? "LOGIN" : "Authenticating..."}</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <Link to={REGISTRATION}>not registered? <strong>Register here!</strong></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}