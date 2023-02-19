import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux'
import productReducer from "./Compnents/features/productSlice";


const store = configureStore({
    reducer: {
        products: productReducer 
    }
})

ReactDOM.render(<Provider store={store}> <App /></Provider>, document.getElementById("root1"));
