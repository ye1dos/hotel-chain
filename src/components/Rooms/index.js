import React, {useState} from 'react';
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setHotels} from '../../redux/actions/HotelActionCreator';
import {getRooms} from "../../shared/BaseUrl";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useLocation } from "react-router-dom";



const Rooms = () => {
    const history = useHistory()
    const [rooms, setRooms] = useState([])
    const location = useLocation();
    const my_id = location.state.id;
    useEffect(() => {
        getRoomsFunc()
    }, [])

    const getRoomsFunc = () => {
        console.log(getRooms)
        axios.get(`${getRooms}?hotelID=` + my_id)
            .then(res => {
                console.log(res)
                setRooms(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const reserve = (hotel_id) => {
        history.push(`/reservation/:${hotel_id}`, {id: hotel_id});
    }
    return (
        <div>
            <h3>Hotels List</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => {
                        return (<div>
                            <tr>
                                <th>{room.RTname}</th>
                                <th>{room.cleanDate}</th>
                                <th>{room.floor}</th>
                                <th>{room.roomNumber}</th>
                                <button onClick={() => reserve(room.hotelID)}>reserve</button>
                            </tr>
                        </div>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Rooms;
