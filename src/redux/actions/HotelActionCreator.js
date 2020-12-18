import * as ActionType from "../types";
import {getHotelsUrl} from "../../shared/BaseUrl";
import axios from 'axios'
export const getHotels = () => (dispatch) => {
        axios.get(`${getHotelsUrl}`)
            .then(res => {
                console.log(res.data)
                dispatch(setHotels(res.data));
            })
            .catch(err => {console.log(err);
            })
}

export const setHotels = (hotels) => {
    return {
        type: ActionType.setHotels,
        payload: hotels
    }
}
