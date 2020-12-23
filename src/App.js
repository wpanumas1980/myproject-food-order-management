import React from "react";
import { BrowserRouter} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/Auth';
import Navbar from "./components/NavBar/NavBar";
import PrivateRoutes from "./containers/PrivateRoutes/PrivateRoutes";

function App() {
   return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar/>
          <PrivateRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
