import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import { applyMiddleware,compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import Reducers from "./reducers/index"

const store1 = configureStore({reducer : Reducers} ,compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store1}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Provider>
);

