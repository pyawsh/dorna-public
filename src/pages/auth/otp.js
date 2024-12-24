import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const OTPInput = ({ length = 4, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if not the last one
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Submit OTP if fully entered
        if (newOtp.every((digit) => digit !== "")) {
            onSubmit(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div>
            {otp.map((_, index) => (
                <input
                    key={index}
                    ref={(el) => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{ width: '2rem', marginRight: '0.5rem', textAlign: 'center' }}
                />
            ))}
        </div>
    );
};


const SendOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState({});
    const [loading, setLoading] = useState(false);
    const mobile = localStorage.getItem("mobile");
    const logged_in = localStorage.getItem("logged_in");
    const [resend, setResend] = useState(false);
    const [timeState, setTimeState] = useState(0);
    let time = 120;
    let timerInterval;

    // const handleUpdateOtp = (index, code) => {
    //     setOtp(prev => {
    //         return {
    //             ...prev,
    //             [index]: code
    //         };
    //     });
    // };

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        document.getElementById("countdown").innerHTML =
            `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (time > 0) {
            time--;
        } else {
            setResend(() => true);
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "00:00";
        }
    }

    const handleUpdateAdminDashboardToken = async (token, id, nav_route) => {
        const currentDate = new Date();
        currentDate.toLocaleString("fa-IR");
        let date = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        let time = currentDate.toTimeString().slice(0, 5);

        if (!token || !id) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=uploadusertoken&Token=${token}&DateTokenReceive=${date}&TokenTimeReceive=${time}&apikey=${process.env.REACT_APP_API_KEY}&ccid=${id}&userid=${id}`)
            .then(function (response) {
                if (response.data.error !== 0) {
                    // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
                    return;
                }
            });
        localStorage.setItem("user_id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("logged_in", true);
        localStorage.setItem("last_auth_date", new Date());
        navigate(nav_route);
    };

    const handleGetUserToken = async (id, route) => {
        if (!id) return;
        const body = {
            id: id
        };
        await axios.post(`${process.env.REACT_APP_OTP_BACKEND}auth/token`, body)
            .then(function (response) {
                if (response.data.status !== 200) {
                    // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
                    return;
                }

                const token = response.data.data.token;
                const userId = response.data.data.user_id;

                handleUpdateAdminDashboardToken(token, userId, route);
            })
            .catch((err) => {
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            });
    };

    const handleCheckIfUserExit = async (gData) => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=CheckUserExsist&apikey=${process.env.REACT_APP_API_KEY}&mobile=${mobile}`)
            .then(function (response) {
                const data = response.data;
                if (data.length > 0) {
                    const mData = data[0];
                    const mId = mData.Id;
                    handleGetUserToken(mId, "/profile");
                } else {
                    const id = gData.Id;
                    handleGetUserToken(id, "/auth/user");
                }
            })
            .catch((err) => {
                setLoading(false);
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            });
    };

    const handleCreateNewRecordForUser = async (body) => {
        await axios.post(`${process.env.REACT_APP_OTP_BACKEND}auth/createUser`, body)
            .then(function (response) {
                if (response.data.status !== 200) {
                    // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
                    return;
                }
                const token = response.data.token;
                const userId = response.data.user_id;
                handleUpdateAdminDashboardToken(token, userId, "/auth/user");
                // handleUpdateAdminDashboardToken(token, userId, "/auth/user");
            })
            .catch((err) => {
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            })
            .finally(() => {
                setLoading(false);
            })
        //send user to /auth/user page
    };

    const handleCheckIfUserMobileExist = async (body) => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=CheckMobileExists&apikey=${process.env.REACT_APP_API_KEY}&mobile=${mobile}`)
            .then(function (response) {
                const data = response.data;
                if (data.length > 0) {
                    const mData = data[0];
                    handleCheckIfUserExit(mData);
                } else {
                    handleCreateNewRecordForUser(body);
                }
            })
            .catch((err) => {
                setLoading(false);
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const mOtp = Object.values(otp).join("");
        console.log(mOtp);
        if (mOtp.length !== 4) {
            // alert("کد ورود میباست 4 رقمی باشد.");
            return;
        }
        if (!mobile) return;

        const body = {
            mobile: mobile,
            code: Number(mOtp)
        };

        setLoading(true);
        await axios.post(`${process.env.REACT_APP_OTP_BACKEND}auth/otp`, body)
            .then(function (response) {
                if (response.data.status !== 200) {
                    // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
                    return;
                }
                handleCheckIfUserMobileExist(body);
            })
            .catch((err) => {
                setLoading(false);
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            });
    };

    useEffect(() => {
        timerInterval = setInterval(updateTimer, 1000);
        return () => {
            clearInterval(timerInterval);
        };
    }, [timeState]);

    const handleSendCodeAgain = async () => {
        setTimeState(prev => prev + 1);
        setResend(() => false);
        if (!mobile) {
            // alert("مشکلی پیش آمده، لطفا کمی بعد تلاش کنید!");
            return;
        }
        const body = {
            mobile: mobile
        };

        await axios.post(`${process.env.REACT_APP_OTP_BACKEND}auth/login`, body)
            .then(function (response) {
                if (response.data.status !== 200) {
                    // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
                    return;
                }
            })
            .catch((err) => {
                // alert("مشکلی پیش آمده است، لطفا کمی بعد تلاش کنید.");
            });
    };

    const submitOtp = (otp) => {
        setOtp(() => otp);
    };

    return <section className="AZ-login-page AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <form action="">
                        <h1 className="login-title mb-3"> کد تایید را وارد کنید. </h1>
                        <div className="AZ-field-group">
                            <label htmlFor="" className="d-flex align-items-center gap-2"> کد 4 رقمی به
                                شماره <span>{mobile}</span> ارسال شده است. </label>
                            <fieldset className="number-code">
                                <OTPInput onSubmit={submitOtp} />
                            </fieldset>
                        </div>
                        <Link to={"/auth"} className="change-number">ویرایش شماره؟</Link>
                        <button type="submit" className="AZ-primary-btn w-100 mt-4" onClick={handleLogin} disabled={loading}>{loading === true ? "لطفا صبر کنید" : "ورود"}</button>
                        <p className="get-code-again text-center my-3">دریافت دوباره کد ( <span
                            id="countdown">
                            <div id="countdown"></div>

                        </span> )
                        </p>
                        {resend && <p className="get-code-again text-center my-3">دریافت دوباره کد ( <a href="#"
                            onClick={handleSendCodeAgain}> دریافت</a> )
                        </p>}
                    </form>
                </div>
            </div>
        </div>
    </section>;
};

export default SendOtp;