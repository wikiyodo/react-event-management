import React, {Component} from 'react';
import { HOME, REGISTRATION } from '../../dist/routes';
import { Link, Redirect } from 'react-router-dom';
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker,DateRange } from 'react-date-range';
import { format, addDays } from 'date-fns';
import { REQUEST_EVENT_CREATE } from '../../requests/event';
import { getBody } from '../../requests';
import Controller from '../controller';
import Authentication from '../../helpers/auth';



const formatDateDisplay = (date, defaultText) => {
    if (!date) return defaultText;
    return format(date, 'MM/DD/YYYY');
};

export default class EventCreate extends Controller{
    state = {
        address:'',
        dateRange: {
            selection: {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection',
            },
          },
        loading: false,
        errors: {},
        successMessage:"",
        errorMessage:"",
        location:{}
    };
    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        console.log(address);
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              this.setState({
                  location:{
                      lat: latLng.lat,
                      lng: latLng.lng,
                      name: address
                  },
                  address
              });
            console.log('Success', latLng);
          })
          .catch(error => console.error('Error', error));
    };


    handleRangeChange = (payload) => {
        console.log("dateRange", payload);
        this.setState({
            dateRange: {
            ...this.state.dateRange,
            ...payload,
          },
        });
      };

    submitEvent = (e) => {
        e.preventDefault();
        this.loading(true);

        let title = this.refs.title.value;
        let details = this.refs.details.value;
        let location = this.state.location;
        let date = {
            start: this.state.dateRange.selection.startDate,
            end: this.state.dateRange.selection.endDate,
        };
        


        REQUEST_EVENT_CREATE({ title, details, location, date }, (err, res) => {
            this.loading(true);
            if(err){
                this.setError("Could not connect to the internet");
                return;
            }

            let body = getBody(res);
            
            if(body.status){
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
                
        if(!(new Authentication).isUserLoggedIn())
            return <Redirect to={{
                pathname:HOME,
            }} />;


        let value = this.state.value;
		const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		}
        return(
            <section className="home_banner_area">
                <div className="banner_inner" style={{paddingTop:"0"}}>
                    <div className="container">
                        <div className="banner_content">
                        <h2>CREATE EVENT</h2>
                        <p>Manage your events seamlesly</p>	
                            <div className="row">	
                                <div className="col-lg-6 offset-lg-3">
                                    <div id="mc_embed_signup">
                                        <form style={{textAlign: "left"}} onSubmit={this.submitEvent}>
                                            {this.renderError()}
                                            {this.renderSuccess()}
                                            <div className="form-group">
                                                <label>Event title:</label>
                                                <input ref="title" type="text" className="form-control" />
                                                { this.renderFieldError('title') }
                                            </div>
                                            <div className="form-group">
                                                <label>Event Description:</label>
                                                <textarea ref="details" type="text" className="form-control" />
                                                { this.renderFieldError('details') }
                                            </div>
                                            <div className="form-group">
                                                <label>Location:</label>
                                                { this.renderFieldError('location') }
                                                <PlacesAutocomplete
                                                    value={this.state.address}
                                                    onChange={this.handleChange}
                                                    onSelect={this.handleSelect}
                                                    >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                                                        let inputProps = getInputProps({
                                                            placeholder: 'Search Places ...',
                                                            className: 'location-search-input',
                                                        });
                                                        inputProps.className += " form-control ";

                                                        return (
                                                            <div>
                                                                
                                                                <input
                                                                    {...inputProps}
                                                                />
                                                                <div className="autocomplete-dropdown-container">
                                                                {loading && <div>Loading...</div>}
                                                                {suggestions.map(suggestion => {
                                                                    const className = suggestion.active
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
                                                                    // inline style
                                                                    const style = suggestion.active
                                                                    ? { backgroundColor: '#6a8279', cursor: 'pointer' }
                                                                    : { backgroundColor: '#495057', cursor: 'pointer' };
                                                                    return (
                                                                    <div
                                                                        {...getSuggestionItemProps(suggestion, {
                                                                        className,
                                                                        style,
                                                                        })}
                                                                    >
                                                                        <span>{suggestion.description}</span>
                                                                    </div>
                                                                    );
                                                                })}
                                                                </div>
                                                            </div>
                                                            )}
                                                        }
                                                </PlacesAutocomplete>
                                            </div>
                                            <div className="form-group">
                                                <label>Date:</label>
                                                { this.renderFieldError('date') }
                                                <section title="RangePicker">
                                                <div>
                                                    <input
                                                    type="text"
                                                    readOnly
                                                    value={formatDateDisplay(this.state.dateRange.selection.startDate)}
                                                    />
                                                    <input
                                                    type="text"
                                                    readOnly
                                                    value={formatDateDisplay(this.state.dateRange.selection.endDate, 'Continuous')}
                                                    />
                                                </div>

                                                <DateRange
                                                    onChange={this.handleRangeChange}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={[this.state.dateRange.selection]}
                                                    className={'PreviewArea'}
                                                />
                                                </section>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-info tickets_btn">CREATE</button>
                                            </div>
                                        </form>
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