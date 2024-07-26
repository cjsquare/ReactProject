import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { USER_URL } from "../../api";
import { useAuthContext } from "../../context/hooks/useAuthContext";

const useRegister = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  

  const register = (name, email, password) => {
    setIsLoaded(true);
    const time = new Date();
    const createdAt = time.toISOString();
    const updatedAt = time.toISOString();

    const data = {
      name: name,
      email: email,
      password: password,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`

    fetch(USER_URL + "/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoaded(false);
          toast.error(response.statusText || "Error with our response!");
          return;
          // console.log("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          setIsLoaded(false);
          return;
        }

        toast.success(
          data?.name + " registered successfully" ||
            "User registration successful"
        );
        navigate("/login");

        // setWorkout(data);
        setIsLoaded(true);
        // console.log(data); // Process the JSON data here
      })
      .catch((error) => {
        setIsLoaded(false);
        toast.error(error.error || "Something is wrong with our server");
        // console.error(
        //   "There has been a problem with your fetch operation:",
        //   error
        // );
      });
  };

  return { register, isLoaded };
};


const useLogin = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = (email, password) => {
    setIsLoaded(true);

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`

    fetch(USER_URL + "/user")
      .then((response) => {
        if (!response.ok) {
          setIsLoaded(false);
          toast.error(response.statusText || "Error with our response!");
          return;
          // console.log("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          setIsLoaded(false);
          return;
        }

        // data.array.forEach(element => {

        // });

        const item = data.filter((data) =>
          // user details is vetted
          data.email === email && data.password === password ? data : null
        );

        // console.log(item[0])

        // if user credentials is invalid...
        // .. return error or incorrect login details
        if (item[0] == undefined || item === null) {
          toast.error("Incorrect login details")
          return
        }

        
        // if user credentials is valid...
        if (item[0]) {
          //1. remove password
          const data ={
            id:item[0]?.id,
            email:item[0]?.email,
            name:item[0]?.name
          };
          //2. store user info on local store
            localStorage.setItem("user", JSON.stringify(data))
            //3. store user info in react state
            dispatch({ type: "LOGIN", payload: data });
            // notify the user on successful logic
            toast.success(item[0]?.name + " logged in successfully" || "user logged in successfully");
            //4.  navigate to default
            navigate("/");
  
            //5. setWorkout(data);
            setIsLoaded(true);
            //6. end process
            return
          
        }

        

        // console.log(data); // Process the JSON data here
      })
      // if there is error with the fetchAPI system ...
      //  .. catch error
      .catch((error) => {
        setIsLoaded(false);
        // notify user on error
        toast.error(error.error || "Something is wrong with our server");
        // console.error(
        //   "There has been a problem with your fetch operation:",
        //   error
        // );
      });
  };

  return { login, isLoaded };
};

const useLogout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    setIsLoaded(true);

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`

    fetch(USER_URL + "/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoaded(false);
          toast.error(response.statusText || "Error with our response!");
          return;
          // console.log("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          setIsLoaded(false);
          return;
        }

        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/login");

        // setWorkout(data);
        setIsLoaded(true);
        // console.log(data); // Process the JSON data here
      })
      .catch((error) => {
        setIsLoaded(false);
        toast.error(error.error || "Something is wrong with our server");
        // console.error(
        //   "There has been a problem with your fetch operation:",
        //   error
        // );
      });
  };

  return { logout, isLoaded };
};

export { useRegister, useLogin, useLogout };
