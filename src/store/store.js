import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import dateReducer from './reducers/dateReducer'

export const store=configureStore({
    reducer: {
        userReducer: userReducer,
        dateReducer:dateReducer
    }
})