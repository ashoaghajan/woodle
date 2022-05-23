import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const getSolutions = async() => {
    try{
        const { data } = await axios.get('/solutions', { baseURL });
        return data;
    }
    catch(err){
        console.log(err);
        return [];
    }
}

export const getLetters = async() => {
    try{
        const { data } = await axios.get('/letters', { baseURL });
        return data;
    }
    catch(err){
        console.log(err);
        return [];
    }
}