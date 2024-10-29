import axios from 'axios'
import base_url from './ApiConst'

export const Books_Data = async()=>{
    return await axios.get(`${base_url}api/v0/books`,{
        headers: {
            "Content-Type": "application/json",
            // Authorization: Token,
          },
    })
}


export const Search_Book_Data = async(payload)=>{
    return await axios.post(`${base_url}api/v0/search`,payload,{
        headers: {
            "Content-Type": "application/json",
            // Authorization: Token,
          },
    })
}


export const Find_Books_Details = async(id)=>{
    return await axios.get(`${base_url}api/v0/bookId/${id}`,{
        headers: {
            "Content-Type": "application/json",
            // Authorization: Token,
          },
    })
}


export const User_Register = async(payload)=>{
    return await axios.post(`${base_url}api/v0/register`,payload,{
        headers: {
            "Content-Type": "application/json",
            // Authorization: Token,
          },
    })
}


export const User_Login = async(payload)=>{
    return await axios.post(`${base_url}api/v0/login`,payload,{
        headers: {
            "Content-Type": "application/json",
            // Authorization: Token,
          },
    })
}

