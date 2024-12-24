import {useNavigate} from "react-router-dom";

const HandlePreviousPageButton = (props) => {
    const navigate = useNavigate();

    const handleRouteBack = () => {
        if (!props.overrideMethod) {
            navigate(-1);
        }
        else{
            props.overrideMethod();
        }
    };

    return <button className="back-btn" onClick={handleRouteBack}><span className="icon-arrow-left1"></span></button>;
};
export default HandlePreviousPageButton;