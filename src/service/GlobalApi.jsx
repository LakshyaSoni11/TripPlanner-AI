import axios from "axios"

BASE_URL ='https://maps.googleapis.com/maps/api/place/textsearch/output?parameters'

const config ={
    headers:{
        'Content-Type':'application/json',
         'X-Gpog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_APIKEY,
         'X-Gpog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
         ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)