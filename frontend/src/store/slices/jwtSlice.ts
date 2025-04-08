import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tokenState {
    jwttoken : string
}
const initialState: tokenState = {
    jwttoken: '',
};

const jwtSlice =createSlice({
    name:'jwttoken',
    initialState,
    reducers:{
        saveToken(state:tokenState,action:PayloadAction<string>){
                state.jwttoken =action.payload ;
        },
        removeToken(state:tokenState){
            state.jwttoken ='' ;
    }
    }
})

export const {saveToken ,removeToken}=jwtSlice.actions; 
export default jwtSlice.reducer;