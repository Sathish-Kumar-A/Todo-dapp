import React from 'react';
import { Web3 } from './components/web3/Web3';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <Web3>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Web3>
  )
}


