import React, {Component} from 'react';
import { HOME, REGISTRATION, LOGIN } from '../../dist/routes';
import { Link } from 'react-router-dom';
import { REQUEST_LOGIN, REQUEST_REGISTER } from '../../requests/account';
import Controller from '../controller';
import { getBody } from '../../requests';

export default class RegistrationPage extends Controller{

    state = {
        loading: false,
        errors: {},
        successMessage:"",
        errorMessage:""
    };

    
    registerUser = (e)=>{
        // prevent default form action
        e.preventDefault();
        this.loading(true);
        let firstName_ = this.refs.firstName;
        let lastName_ = this.refs.lastName;
        let email_ = this.refs.email;
        let password_ = this.refs.password;

        let firstName = firstName_.value;
        let lastName = lastName_.value;
        let email = email_.value;
        let password = password_.value;



        REQUEST_REGISTER({firstName, lastName, email, password}, (err, res) => {
            this.loading(true);
            if(err){
                this.setError("Could not connect to the internet");
                return;
            }

            let body = getBody(res);
            
            if(body.status){
                // unset fields
                firstName_.value = '';
                lastName_.value = '';
                email_.value = '';
                password_.value = '';
                this.setSuccess(body.message);
                this.setError("");
                this.setFieldErrors({});
                return;
            }
            
            this.setError(body.message);
            this.setFieldErrors(body.extras);
        });
    };
    

    render(){
        let {loading} = this.state;

        return(
            <section className="home_banner_area">
                <div className="banner_inner" style={{paddingTop:"0"}}>
                    <div className="container">
                        <div className="banner_content">
                        <h2>REGISTER</h2>
                        <p>Manage your events seamlesly</p>	
                            <div className="row">	
                                <div className="col-lg-6 offset-lg-3">
                                    <div id="mc_embed_signup">
                                        <form style={{textAlign: "left"}} onSubmit={this.registerUser}>
                                        {this.renderError()}
                                        {this.renderSuccess()}
                                            <div className="form-group">
                                                <label>First Name:</label>
                                                <input ref="firstName" type="text" className="form-control" required />
                                                { this.renderFieldError('firstName') }
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name:</label>
                                                <input ref="lastName" type="text" className="form-control" required />
                                                { this.renderFieldError('lastName') }
                                            </div>
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input ref="email" type="email" className="form-control" required />
                                                { this.renderFieldError('email') }
                                            </div>
                                            <div className="form-group">
                                                <label>Password:</label>
                                                <input ref="password" type="password" className="form-control" required />
                                                { this.renderFieldError('password') }
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-info tickets_btn" disabled={loading}>{ !loading ? "REGISTER" : "REGISTERING..."}</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <Link to={LOGIN}>already registered? <strong>Login here!</strong></Link>
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