import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/courses")
    }, []);

    return <div>...redirecting</div>
}
export default Success;