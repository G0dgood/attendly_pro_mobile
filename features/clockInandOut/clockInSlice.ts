import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clockInService from './clockInService' 
   
const initialState:any = { 

  user:   null,
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',  

  logindata:   null,
  loginisError: false,
  loginisSuccess: false,
  loginisLoading: false, 
  loginmessage: '',  
 
}
 

// clock In and Out
export const clockInOut = createAsyncThunk('clock/clockInOut', async (data, thunkAPI) => {
  try {
    return await clockInService.clockInOut()

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 

 // Login user
export const loginUser = createAsyncThunk('auth/loginUser', async (data, thunkAPI) => {
  try {
    return await clockInService.loginUser()

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


 

export const clockInSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    reset: (state) => {   
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''  

 

      state.loginisLoading = false
      state.loginisSuccess = false
      state.loginisError = false
      state.loginmessage = ''  
    },
  
  },

  extraReducers: (builder) => {
    builder
      //  clock In & Out 
      .addCase(clockInOut.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clockInOut.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload 
      }) 
      .addCase(clockInOut.rejected, (state:any, action) => {
        state.isLoading  = false
        state.isError  = true
        state.message  = action.payload
        state.data  = [] 
      })

      

        //login User
       .addCase(loginUser.pending, (state) => {
        state.loginisLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginisLoading = false
        state.loginisSuccess = true
        state.logindata = action.payload 
      }) 
      .addCase(loginUser.rejected, (state:any, action) => {
        state.loginisLoading  = false
        state.loginisError  = true
        state.loginmessage  = action.payload
        state.logindata  = [] 
      })
  },
})

export const { reset } = clockInSlice.actions
export default clockInSlice.reducer




 