import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WorkoutContextProvider } from "./context/context-api/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/context-api/AuthContext.jsx";
// import reportWebVitals from './reportWebVitals';

// Connect to index.html(static) file
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
{/* Notification*/}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover

      //  theme="colored"
    />
    {/*  we are using contextAPI  with useReducer*/}

    <AuthContextProvider> {/* contextAPI: for user Auth&Auth system*/}
      <WorkoutContextProvider> {/* contextAPI: for workout system*/}
        <App /> {/* Application entry point(file)*/}
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
