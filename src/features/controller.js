import React, { Component } from 'react';

export default class Controller extends Component{

    setError = (errorMessage = "") => {
        this.setState({errorMessage});
    }

    setSuccess = (successMessage = "") => {
        this.setState({successMessage});
    }
    
    setFieldErrors = (errors)=>{
        this.setState({errors});
    };
    
    loading = (status = true) =>    {
        this.setState({status});
    };

    renderError = () => {
        if(this.state.errorMessage == "") return <span />;

        return <div className="alert alert-danger">{this.state.errorMessage}</div>
    };

    renderFieldError = (field) => {
        if(Object.keys(this.state.errors).includes(field) && this.state.errors[field] == "") return <span />;

        return <div className="text text-danger">{this.state.errors[field]}</div>
    };

    renderSuccess = () => {
        if(this.state.successMessage == "") return <span />;

        return <div className="alert alert-success">{this.state.successMessage}</div>
    };
}