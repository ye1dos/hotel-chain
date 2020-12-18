import React, {useState} from 'react';
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setHotels} from '../../redux/actions/HotelActionCreator';
import {getHotelsUrl} from "../../shared/BaseUrl";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const Hotels = () => {
    const history = useHistory()
    const [htls, setHtls] = useState([])
    useEffect(()=>{
        getHotels()
    }, [])
    const getHotels = () => {
        axios.get(`${getHotelsUrl}`)
            .then(res => {
                console.log(res.data)
                setHtls(res.data);
            })
            .catch(err => {console.log(err);
            })
    }
    const selected = (hotel_id) => {
        console.log(hotel_id)
        history.push(`/rooms/:${hotel_id}`, {id: hotel_id});
    }
    return(
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
          {htls.map(hotel => {
                return (<div>
                    <tr>
                        <th>{hotel.name}</th>
                        <th>{hotel.hotelID}</th>
                        <th>{hotel.address}</th>
        <button onClick={() => selected(hotel.hotelID)}>select</button>
                    </tr>
                </div>
                )
            })}
          </tbody>  
        </table> 
        </div>
    )
}

export default Hotels;