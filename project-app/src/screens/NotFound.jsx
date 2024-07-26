import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(-1);
    }, [500]);

    return <div>NotFound</div>;
}
