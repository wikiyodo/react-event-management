import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
import { REQUEST_EVENT_GET } from '../../requests/event';
import { getBody } from '../../requests';
import { Modal } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import Authentication from '../../helpers/auth';
import { HOME } from '../../dist/routes';
import  { Redirect } from 'react-router-dom';

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class EventCalendar extends Component{

    state = {
        events: [
            {
                start: new Date(),
                end: (new Date()),
                title: 'Loading...',
                allDay: true,
                resource:'s'
            },
        ],
        show: false
    };

    componentDidMount(){
        if((new Authentication).isUserLoggedIn())
            this.getAllEvents();
    }
    
    reformatEvent = (event)=>{
        return {
            start: event.date.start,
            end: event.date.end,
            title: event.title,
            allDay: true,
            resource: event.details,
            event
        };
    };

    reformatEvents = (events) => {
        let reformatedEvents = events.map((event, i)=>{
            return this.reformatEvent(event);
        });

        console.log(reformatedEvents);
        this.setState({events: reformatedEvents});
    };

    getAllEvents = () => {
        
        REQUEST_EVENT_GET({}, (err, res) => {

            if(err){
                alert("Could not load events due to authentication problem. Retrying...");
                setTimeout(()=>this.getAllEvents, 3000);
                return;
            }

            let body = getBody(res);
            
            if(body.status){
                this.reformatEvents(body.extras.events);
            }else{
                setTimeout(()=>this.getAllEvents, 3000);
            }
            
        });
    };


    showEventDetails = ({event})=>{
        this.setState({show:event})
    };

    hideEventDetails = ()=>{
        this.setState({show:false})
    };

    reformatDate = (date)=>{
        let date_ = new Date(date);
        
        return date_.getDate()+'/'+date_.getMonth()+'/'+date_.getFullYear();
    };

    renderEventDetails = ()=>{
        let event = this.state.show;
        if(event === false)
            return <span />;

            console.log({lat: event.location.lat, lng: event.location.lng});
        return (
            <Modal
            show={event !== false}
            size="lg"
            onHide={this.hideEventDetails}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
                            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Event Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{ event.title }</h4>
                <p>{ event.details }</p>
                <div>
                    <strong>Start Date: </strong> <span className="badge">{this.reformatDate(event.date.start)}</span>
                </div>
                <div>
                    <strong>End Date: </strong> <span className="badge">{this.reformatDate(event.date.end)}</span>
                </div>
                <div>
                    <strong>Location: </strong> <span className="badge">{event.location.name}</span>
                </div>
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDdGktaDO-ZTNobA1T512xE11KTvkCOc-o" }}
                    defaultCenter={{lat: event.location.lat, lng: event.location.lng}}
                    defaultZoom={15}
                    >
                    <div
                        lat={event.location.lat}
                        lng={event.location.lng}
                        text={event.title}
                    ><img src="/images/icons8-marker-96.png" style={{height:"30px",
                    width: "30px"}} /></div>
                    </GoogleMapReact>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
            </Modal>
        );
    };

    render(){
        
        if(!(new Authentication).isUserLoggedIn())
            return <Redirect to={{
                pathname:HOME,
            }} />;

        return(
            <section className="home_banner_area">
            {this.renderEventDetails()}
                <div className="banner_inner" style={{paddingTop:"0"}}>
                    <div className="container">
                        <div className="banner_content">
                            <h2>EVENT CALENDAR</h2>
                            <div style={{height: "700px"}}>
                                <BigCalendar
                                    localizer={localizer}
                                    events={this.state.events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    onSelectEvent={this.showEventDetails}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}