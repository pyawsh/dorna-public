import logo from "../../assets/img/color-logo-2.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { hardLogoutLocalStorage } from "../../utils/logout";

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const loggedIn = localStorage.getItem("logged_in");

    useEffect(() => {
        if (token && loggedIn === 'true') {
            navigate("/home");
        }
        if (!!token && localStorage.getItem("mobile")) {
            try {
                setNumber((localStorage.getItem("mobile").toString()));
            } catch (error) {}
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!number) {
            // alert("شماره همراه را به صورت کامل وارد نمایید!");
            return;
        }
        const checkMobileNumber = number.startsWith("09");
        const mobileNumberLength = number.length === 11;
        if (!checkMobileNumber) {
            // alert("شماره همراه میبایست با 09 شروع شود!");
            return;
        }
        if (!mobileNumberLength) {
            // alert("شماره همراه را به صورت کامل وارد نمایید!");
            return;
        }

        const body = {
            mobile: number
        };

        // await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=CheckMobileExists&apikey=${process.env.REACT_APP_API_KEY}&mobile=${number}`)
        //     .then(function (response) {
        //         const data = response.data;
        //         if (data.length > 0) {
        //             // user logged in before
        //             localStorage.setItem("logged_in", true);
        //         } else {
        //             localStorage.setItem("logged_in", false);
        //         }
        //     })
        //     .catch((err) => {
        //         alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
        //     });

        // Check if uesr singed in in last 1month and token is still valid
        const mobile = localStorage.getItem("mobile");
        const lastAuthDate = localStorage.getItem("last_auth_date");
        const date1 = new Date(lastAuthDate);
        const date2 = new Date(); // now
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (mobile === number) {
            if (diffDays <= 30 && !!token) {
                localStorage.setItem("logged_in", true);
                navigate("/home");
                return;
            }
        } else {
            // hardLogoutLocalStorage();
        }


        setLoading(true);
        await axios.post(`${process.env.REACT_APP_OTP_BACKEND}auth/login`, body)
            .then(function (response) {
                if (response.data.status !== 200) {
                    // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
                    return;
                }
                localStorage.setItem("mobile", number);
                navigate("/auth/otp");
            })
            .catch((err) => {
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            })
            .finally(() => {setLoading(false)});
    };

    const handleChangeMobile = e => {
        const mobile = e.target.value;
        setNumber(mobile);
    };

    return <section className="AZ-login-page AZ-page-container">
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-lg-12 h-100">
                    <form action="" className="d-flex flex-column justify-content-between">
                        <div className="flex-grow-1">
                            <div className="d-flex align-items-center justify-content-center mb-4">
                                <img src={logo} alt="" />
                            </div>
                            <h1 className="login-title mb-4">ورود به درنا پلاس</h1>
                            <div className="AZ-field-group">
                                <label htmlFor="">برای ورود به برنامه شماره همراه خود را وارد کنید.</label>
                                <input type="tel" min={11} max={11} placeholder="09" value={number} onChange={handleChangeMobile} />
                            </div>
                        </div>
                        <div className="AZ-field-group display-flex align-items-center flex-row justify-content-start gap-0">
                            <label htmlFor="remember-me" className="mb-0">
                                مرا به خاطر بسپار
                            </label>
                            <input type="checkbox" style={{ height: '15px', width: '15px', flex: 0 }} id="remember-me" checked/>
                        </div>
                        <button type="submit" disabled={loading} className="AZ-primary-btn w-100" onClick={handleLogin}>{loading === true ? "لطفا صبر کنید" : "ادامه"}</button>
                    </form>
                </div>
            </div>
        </div>
    </section>;
};
export default Auth;