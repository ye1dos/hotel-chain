import React, {useState} from 'react';
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setHotels} from '../../redux/actions/HotelActionCreator';
import {roomReservationUrl} from "../../shared/BaseUrl";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useLocation } from "react-router-dom";

const RoomReservation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [reservation, setReservation] = useState({
        reservationID: 1,
        hotelID: location.state.id,
        guestID: '2',
        checkIn: '',
        checkOut: '',
        paid: false,
        peopleNumber: 1,
        totalPayment: 12500

    });

    const his = useHistory()

    function handleChange(evt) {
        const value = evt.target.value;
        setReservation({
          ...reservation,
          [evt.target.name]: value
        });
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(reservation)
        axios.post(`${roomReservationUrl}?reservationID=` + reservation.reservationID + `&hotelID=` + reservation.hotelID + `&guestID=` 
        + reservation.guestID + `&checkIn=` + reservation.checkIn + `&checkOut=` + reservation.checkOut + 
        `&paid=` + reservation.paid + `&peopleNumber=` + reservation.peopleNumber + `&totalPayment=` + reservation.totalPayment)
            .then(res => {
                console.log(res)
                if(res.data === "Success! Reservation has been added.")
                {
                    alert("Your reservation successfully added")
                    his.push("/hotels")
                }
                else{
                    alert("Please try again")
                }
            }).catch(err => console.log("error"))
        }

        return (
            <div style={{textAlign: "center"}}>
                <h2>Room Reservation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{marginRight: "2rem"}}>checkIn ("yyyy-MM-dd HH:mm:ss" format)</label>
                        <input
                            type="text"
                            name="checkIn"
                            required
                            value={reservation.checkIn}
                            onChange={handleChange}
                            placeholder={"2020-11-20 23:59:59"}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{marginRight: "2rem"}}>checkOut ("yyyy-MM-dd HH:mm:ss" format)</label>
                        <input
                            type="text"
                            name="checkOut"
                            required
                            value={reservation.checkOut}
                            onChange={handleChange}
                            placeholder={"2020-11-20 23:59:59"}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{marginRight: "2rem"}}>people Number</label>
                        <input
                            type="text"
                            name="peopleNumber"
                            required
                            value={reservation.peopleNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div><h3>Total: {reservation.totalPayment * reservation.peopleNumber} kzt</h3></div>
                    <button type="submit">Reserve</button>
                    <button onClick={()=>{his.goBack()}}>Go back</button>
                </form>
            </div>
        );
}

export default RoomReservation;