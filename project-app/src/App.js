import { useEffect } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./screens/Home";
import Layout from "./Layout";
import About from "./screens/About";
import Blog from "./screens/Blog";
import WorkoutForm from "./screens/WorkoutForm";
import UpdateWorkoutForm from "./components/home/UpdateWorkoutForm";
import ToDoList from "./screens/ToDoList";
import Register from "./screens/auth/Register";
import NotFound from "./screens/NotFound";
import Login from "./screens/auth/Login";


export default function App() {
    // Initiate your AOS

    useEffect( () => {
        AOS.init({
            // Global settings
            once: false,
        });
    }, []);
    return (
        <>
            {/* Instantiate your Browser routing system */}
            <BrowserRouter>
                {/* Wrap body within a "Layout" Component */}
                <Layout>
                    <Routes>
                        {/* Routing pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/create/new" element={<WorkoutForm />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/update/:id" element={<UpdateWorkoutForm />} />
                        <Route path="/todo" element={<ToDoList/>}/>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element= {<Login/>}/>
                        <Route path="/*" element={<NotFound />} />

                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}




{/* <BrowserRouter>
<Routes> */}

{/* <Route path="/*" element={<NotFound />} /> */ }
// </Routes>
// </BrowserRouter>
