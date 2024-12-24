import BottomNavigation from "../../components/share/BottomNavigation";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import userInformation from "../../assets/img/user-info.png";
import {Button, Modal, Sheet, Typography} from "@mui/joy";
import { softLogoutLocalStorage } from "../../utils/logout";

const Profile = () => {
    const [user, setUser] = useState();
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('bottom_link',3)
    }, []);

    const getUserProfile = () => {
        if (!id) return;
        // axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserInfoWithToken&apikey=${process.env.REACT_APP_API_KEY}&token=${token}`)
        //     .then(function (response) {
        //         setUser(() => response.data[0]);
        //     });
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getallinformationuser&apikey=${process.env.REACT_APP_API_KEY}&token=${token}&id=${id}`)
            .then(function (response) {
                setUser(() => response.data[0]);
            });
    };

    useEffect(() => {
        getUserProfile();
        return () => {
            setUser([]);
        };
    }, []);

    const handleLogOut = () => {
        // localStorage.clear();
        softLogoutLocalStorage();
        navigate("/");
        // codes below commented due to use the token again when logged in with previous number 
        // axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=uploadusertoken&Token=&DateTokenReceive=&TokenTimeReceive=&apikey=${process.env.REACT_APP_API_KEY}&ccid=${id}&userid=${id}`)
        //     .then(function (response) {
        //         if (response.data.error === 0) {
        //         }
        //     });
    };


    return <section class="AZ-page-container AZ-dashboard-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center gap-3 p-4">
                        <div class="profile-img AZ-img-container">
                            <div class="AZ-img-container-inner AZ-img-cover">
                                <img
                                    src={user?.Uploadphoto ? `${process.env.REACT_APP_FILEMANAGER}${user?.Uploadphoto}` : userInformation}
                                    alt=""/>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <h4 class="username">{!!user && `${user?.Name} ${user?.Family}`}</h4>
                            <span>(
                                عادی
                                )</span>
                        </div>
                    </div>
                    <ul class="dashboard-menu-list p-4 pt-0">
                        <li>
                            <Link to="/profile/information" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-drivers-license-o"></span>
                                اطلاعات کاربری
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/auth" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-edit-file"></span>
                                احراز هویت
                            </Link>
                        </li>
                        <li>
                            <Link to="/exam/full-report" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-clipboard"></span>
                                سوابق آزمون‌ها
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/credit" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-bitcoin"></span>
                                مدیریت اعتبار
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/workshops" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-presentation-board"></span>
                                ورکشاپ‌ها
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/support" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-headset_mic"></span>
                                پشتیبانی
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/invite" class="dashboard-link d-flex align-items-center gap-3">
                                <span class="icon-share"></span>
                                دعوت از دوستان
                            </Link>
                        </li>
                        <li onClick={() => setOpen(true)}>
                            <div class="dashboard-link d-flex align-items-center gap-3" data-bs-target="#logoutModal"
                                 data-bs-toggle="modal">
                                <span class="icon-sign-out"></span>
                                خروج
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <BottomNavigation/>
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    borderRadius: "md",
                    p: 3,
                    boxShadow: "lg",
                }}
            >
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >آیا میخواهید از برنامه خارج شوید ؟</Typography>
                <div className={"d-flex gap-2 mt-5"}>
                    <Button color={"default"} onClick={() => setOpen(false)}>خیر</Button>
                    <Button onClick={handleLogOut} color={"danger"}>بله</Button>
                </div>
            </Sheet>
        </Modal>
    </section>;
};
export default Profile;