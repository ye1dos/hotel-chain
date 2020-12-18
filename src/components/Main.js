import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {fetchSchedule} from '../redux/actions/ScheduleActionCreators'
import Home from './HomePage/Home';
import BuyTicketForm from './Ticket/BuyTicketForm';
import NavigationBar from './HomePage/NavigationBar';
import RegistrationPage from "./HomePage/RegistrationPage";
import {submitRegistrationForm} from "../redux/actions/RegistrationApproveActionCreators";
import {login,logout} from "../redux/actions/LoginActionCreator";
import {getHotels} from '../redux/actions/HotelActionCreator';
import Admin from './Admin/Admin';
import AdminLogin from './Admin/AdminLogin';
import PassengerPage from "./Passenger/PassengerPage";
import PrintTicket from './Ticket/PrintTicket';
import Hotels from './Hotels'
import Rooms from './Rooms'
import RoomReservation from './RoomReservation'
// const path = "http://localhost:8080/hotelchainback_war_exploded/api/"
const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path)),
    submitRegistrationForm: (path) => dispatch(submitRegistrationForm(path)),
    login: (path) => dispatch(login(path)),
    logout: () => dispatch(logout()),
    getHotels: () => dispatch(getHotels())
});


const mapStateToProps = (state) => ({
    schedule: state.schedule,
    registrationApproveState: state.registrationApproveState,
    admin: state.admin,
    loginUser: state.loginUser,
    hotels: state.hotels
});

const AdminRouter = (props) => {
    const PrivateAdminRoute = ({component: Component, ...rest}) => {
        return <Route {...rest} render={ (propsx) => (
            props.admin.isAuthenticated
                ? <Component {...propsx}/>
                : <Redirect to='/admin/login'/>
        )}/>
    };

    return(
        <Switch>
            <PrivateAdminRoute exact path={props.match.url} component={() => <Admin admin={props.admin}/>}/>
            <Route exact path={props.match.url + '/login'} component={() => <AdminLogin admin={props.admin}/> }/>
        </Switch>
    );
};


class Main extends Component{


    render() {

        const BuyTicket = ({match}) => {
            let route = this.props.schedule.schedule.filter(route => route.id === parseInt(match.params.routeId, 10));
            if (route.length === 0)
                return (
                    <div>
                        Select Ticket First
                    </div>
                );
            return (
                <BuyTicketForm route={route[0]} loginUser={this.props.loginUser}/>
            );
        };

        const Printticket = ({match}) => {
            return (
                <div>
                    <PrintTicket loginUser={this.props.loginUser} admin={this.props.admin} id={match.params.ticketId}/>
                </div>
            );
        };

        const callAdminPage = ({match}) => {
            return (
                <AdminRouter admin={this.props.admin} match={match}/>
            );
        };

        const callUserPage = ({match}) => {
            return(
                <div>
                    <NavigationBar loginState={this.props.loginUser} login={this.props.login} logout={this.props.logout}/>
                    <div id="home">
                    <Switch>
                        <Route exact path={match.url} component={() => <Home  logout = {this.props.logout} submitData={this.props.submitRegistrationForm} loginUser = {this.props.loginUser} login = {this.props.login} fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>}/>
                        <Route exact path={match.url + '/buy_ticket/:routeId'} component={BuyTicket}/>
                        <Route exact path={match.url + '/print_ticket/:ticketId'} component={Printticket}/>
                        <Route exact path={match.url + '/registration'} component={() => <RegistrationPage submitData = {this.props.submitRegistrationForm} registrationApproveState = {this.props.registrationApproveState}/>}/>
                        <Route exact path={match.url + '/my_account'} component={() => <PassengerPage loginUser={this.props.loginUser} logout={this.props.logout}/>}/>
                        {/* <Route exact path={match.url + '/hotels'} component={() => <Hotels />} /> */}
                        {/* <Redirect to='/home'/> */}
                        
                    </Switch>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <Switch>
                    <Route path='/admin' component={callAdminPage}/>
                    <Route path='/home' component={callUserPage}/>
                    <Route exact path='/hotels' component={() => <Hotels hotels={this.props.hotels} getHotels={this.props.getHotels}/>} />
                    <Route exact path='/rooms/:id' component={() => <Rooms/>}/>
                    <Route exact path='/reservation/:id' component={() => <RoomReservation/>}/>
                    {/* <Redirect to='/home'/> */}
                </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));