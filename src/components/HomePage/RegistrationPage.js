import {Form, Col,InputGroup, Button} from "react-bootstrap"
import {Input} from "reactstrap";
import React, {Component} from 'react';
import {Loading} from "../../shared/Loading";
import {Redirect} from "react-router-dom"


class RegistrationForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            ID_type: '',
            ID_number:'',
            guestStatus:'',
            password: '',
            userName:'',
            confirm_password:'',
            hiddenMessage:'',
            showIndicator:false
        }
        this.handleAttribute = this.handleAttribute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit = () => {
        this.setState({hiddenMessage:""});
        if (this.state.userName === ''){
            this.setState({hiddenMessage: "Username has to be filled"})
        } else if (this.state.confirm_password !== this.state.password || this.state.password === ''){
            this.setState({hiddenMessage: "Password does not match with the initial password or empty"})
        }else{
            this.setState({hiddenMessage: ""})
            this.props.submitData({
                "userName":this.state.userName,
                "ID_type":this.state.ID_type,
                "ID_number":this.state.ID_number,
                "guestStatus":this.state.guestStatus,
                "password":this.state.password
            })
        }
    }

    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({showIndicator: false})
        }, 8000)
    }


    render() {

        return (
            <div>
                {this.props.registrationApproveState.isLoading ? (
                    <LoadingWithDelay showIndicator = {this.state.showIndicator}/>
                ):(
                    <div className='row justify-content-around'>
                        <div className='reg-form' style={{width: 500}}>
                            <form>
                                <h3>Registration</h3>
                                    <Form.Group as={Col} md="6" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                name = "userName"
                                                value = {this.state.userName}
                                                onChange = {this.handleAttribute}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Row className = "mt-4">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>ID type</Form.Label>
                                        <Input
                                            type="text"
                                            name = "ID_type"
                                            id="id_type"
                                            placeholder = "ID type"
                                            value = {this.state.ID_type}
                                            onChange = {this.handleAttribute}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="id_number">
                                        <Form.Label>ID number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="ID number"
                                            name = "ID_number"
                                            value = {this.state.ID_number}
                                            onChange = {this.handleAttribute}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please choose an id
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} md="6" controlId="status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Guest Status"
                                            name = "guestStatus"
                                            value = {this.state.guestStatus}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="7" controlId="passwordOne">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name = "password"
                                            value = {this.state.password}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="7" controlId="passwordTwo">
                                        <Form.Label>Password Confirm</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name = "confirm_password"
                                            value = {this.state.confirm_password}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label >{this.state.hiddenMessage}</Form.Label>
                                </Form.Row>
                                <Button className='btn-secondary' onClick = {() => this.handleSubmit()}>Submit form</Button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

const LoadingWithDelay = (props) => {
    return (
        <div>
            {props.showIndicator ? (<Loading/>) : (<div></div>)}
        </div>
    )
}

export default class RegistrationPage extends Component{

    render() {
        return (
            <div>
                <RegistrationForm submitData={this.props.submitData} registrationApproveState = {this.props.registrationApproveState}/>
            </div>
        )
    }
}


