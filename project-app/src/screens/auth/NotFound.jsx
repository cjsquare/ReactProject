import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

// This is a component for handling lost routing
export default function NotFound() {
    // This is a 'useNavigate' hook 
    // routing: used as a function to route pages
    const navigate = useNavigate();

    // This is a 'useEffect' hook
    // life cycle: used as a function to maintain...
    // ...sync with the system 
    useEffect(() => {
        // This is used to ensure page 
        // ...routing is maintained

        // setTimeout function for countdown 
        setTimeout(() => {
            navigate(-1); // route back to previous page
        
        }, [500]); // after 0.5 seconds
    });

    // render jsx(UI)
    return<div>NotFound</div>;
}
