import Landing from "../assets/img/color-logo-2.png";
import Motion from "../assets/img/motion.gif";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
    const onImageLoaded = (e) => {
        console.log('loaded', e);
        setIsImageLoaded(true);
        const timer = setTimeout(() => {
            setIsImageLoaded(false);
            navigate("/auth");
            // navigate("/home");
            clearTimeout(timer);
        }, 4500);
    };

    return <>
        <section class="AZ-page-container">
            {/* <div class="container h-100">
                <div class="row h-100">
                    <div class="col-lg-12 d-flex justify-content-between flex-column py-5 h-100">
                        <div class="d-flex align-items-center justify-content-center flex-grow-1">
                            <img src={Landing} alt="" width="150px"/>
                        </div>
                        <h1 class="landing-title text-center"> دانشگاه مجازی درنا پلاس </h1>
                    </div>
                </div>
            </div> */}
            <img src={Motion} alt="" style={{height:'100vh'}} className={`w-100 ${!isImageLoaded && 'd-none'}`} onLoad={onImageLoaded}/>
        </section>
    </>;
};
export default Welcome;