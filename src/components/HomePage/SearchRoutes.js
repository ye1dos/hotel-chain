import React, {Component} from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import ScheduleTable from './ScheduleTable';
import "react-datepicker/dist/react-datepicker.css";
import {locations} from '../../shared/Locations'
import { Card, CardBody, CardTitle } from 'reactstrap';

class SearchRoutes extends Component{
    constructor(props){
        super(props);
        this.state = {
            destination: '',
            start: [],
            end: new Date(),
            routes : []
        };
        this.divStyle = {
            color: 'blue'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.fetchSchedule({"origin": this.state.startStation.value,
            "destination": this.state.destinationStation.value, "date": this.state.timeRoute, "daytime": this.state.timeRange})
    }

    handleStartStChange = (startStation) => {
        this.setState({startStation});
    };

    handleDestinationStChange = (destinationStation) => {
            this.setState({ destinationStation });
    };

    handleTimeRange = (timeRange) => {
        this.setState({timeRange})
    };

    handleSubmitResponse = (routes) => {
        this.setState({routes})
    };

    handleTimeRoute = (timeRoute) => {
        this.setState({timeRoute})
    };

    render(){
        const opts = [];
        for(let i = 0; i < locations.length; i++){
            opts.push({value: locations[i].id, label: locations[i].name});
        }
        return(
            <div style={{marginTop: 30}}>
                <div className='row'>
                    <Card className='search-box' id='search' style={{width: 500}}>
                        <CardTitle  >
                            <h3 id='searchHeader'>Search for a hotel</h3>
                        </CardTitle>
                        <CardBody>
                        <Form>
                            <Form.Row>
                                <Form.Group className = "col-12">
                                    <Form.Label><b>Destination</b> </Form.Label>
                                    <Select
                                        name = "form-field-name"
                                        defaultValue = {this.state.startStation}
                                        onChange = {this.handleStartStChange}
                                        options = {opts}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className = "col-12">
                                    <Form.Label><b>Start Date</b></Form.Label>
                                    <Select
                                        name = "form-field-name"
                                        value = {this.state.destinationStation}
                                        onChange = {this.handleDestinationStChange}
                                        options = {opts}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className = "col-12">
                                    <p><b>End Date</b></p>
                                    <Select
                                        name = "form-field-name"
                                        isMulti
                                        className="basic-multi-select"
                                        value = {this.state.timeRange}
                                        onChange = {this.handleTimeRange}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className="col-8 d-flex">
                                    <p><b>Route Day</b></p>
                                    <DatePicker className='ml-2' selected = {this.state.timeRoute} onChange={this.handleTimeRoute} />
                                </Form.Group>
                                <Form.Group className='ml-auto mr-2'>
                                    <Button className='btn-secondary' onClick = {this.handleSubmit}>
                                        Find
                                    </Button>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                            </Form.Row>
                        </Form>
                        </CardBody>
                    </Card>
                </div>
                <div className='row justify-content-around'>
                    <ScheduleTable schedule={this.props.schedule}/>
                </div>
            </div>
        )
    }
}

export default SearchRoutes;