import userInformation from "../../assets/img/user-info.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const UserInformation = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        family: "",
        University: "",
        major: "",
        BriefUser: "",
        UserSkills: "",
        UserProjects: "",
        introducerid: "",
        Mobile: localStorage.getItem("mobile"),
        Registerdate: (new Date()).toLocaleDateString("en-US"),
    });
    const [dornaGift, setDornaGift] = useState();
    const [filename, setFilename] = useState();

    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        const m = localStorage.getItem("mobile");
        if (!m) return;
        setUser(prev => {
            return {
                ...prev,
                mobile: m
            };
        });
    }, []);

    const insertCustomerInformation = async () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=InsertCustomerInfo&userid=${user_id}&name=${user.name}&family=${user.family}&major=${user.major}&University=${user.University}&UserSkills=${user.UserSkills}&BriefUser=${user.BriefUser}&UserProjects=${user.UserProjects}&mobile=${user.Mobile}&introducerid=${user.introducerid}&registerdate=${user.Registerdate}&ccid=${user_id}&apikey=${process.env.REACT_APP_API_KEY}&UriKind.Absolute`)
            .then(function (response) {

            });
    };

    const handleInformation = (key) => (e) => {
        setUser(prev => {
            return {
                ...prev,
                [key]: e.target.value
            };
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        axios
            .post(`${process.env.REACT_APP_API_GATEWAY}Uploader/UploadFile?apikey=${process.env.REACT_APP_API_KEY}`, formData)
            .then((response) => {
                if (response.data.error !== 0) return;
                setFilename(response.data.error_msg);
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });
    };


    const handleInviteCode = async () => {
        // await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=uploaduserintroducer&introducerid=${user.introducerid}&apikey=${process.env.REACT_APP_API_KEY}&userid=${user_id}`)
        //     .then(function (response) {
        //     });
    };
    const handleSendUsersGift = async (dornaG) => {
        if (!dornaG) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=UpdateUserDornaCoin&dornacoin=${dornaG}&apikey=${process.env.REACT_APP_API_KEY}&userid=6&ccid=${user_id}`)
            .then(function (response) {
                navigate("/profile");
            });
    };
    const handleGiftDornaCoin = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetFirstEntryGift&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                const data = response.data;
                if (data.length < 1) return;
                let help = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].choosenstatus === "1") {
                        help.push(data[i].dornagiftvalue);
                    }
                }
                const mGift = help[help.length - 1];
                setDornaGift(mGift);
                handleSendUsersGift(mGift);
            });
    };

    const handleUploadUserProfileImage = async () => {
        if (!filename) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/Doupdateapi?func=UploadUserImageprofile&Uploadphoto=${filename}&apikey=${process.env.REACT_APP_API_KEY}&ccid=${user_id}`)
            .then(function (response) {
                console.log(response);
            });
    };

    const handleUserInformation = async (e) => {
        e.preventDefault();
        try {
            await insertCustomerInformation();
            // await handleInviteCode();
            await handleGiftDornaCoin();
            await handleUploadUserProfileImage();
            localStorage.setItem("logged_in", true);
            navigate("/profile");
        } catch (err) {
            alert("خطایی رخ داد");
        }
    };

    return <section class="AZ-login-page AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <form action="">
                        <h1 class="login-info-title text-center"> حساب کاربری </h1>
                        <p class="login-text text-center"> برای ورود به برنامه اطلاعات کاربری خود را وارد کنید. </p>
                        <div class="upload_image d-flex align-items-center flex-column mb-5">
                            <div class="position-relative">
                                <div class="preview-profile-img AZ-img-container">
                                    <div class="AZ-img-container-inner AZ-img-cover">
                                        <img id="imgPreview" src={!!filename ? process.env.REACT_APP_FILEMANAGER+filename : userInformation} class="preview1" />
                                    </div>
                                </div>
                            </div>
                            <div class="upload-profile-wrapper">
                                <label for="uploadPrifile" class=" d-flex align-items-center"><span
                                    class="icon-camera"></span></label>
                                {/*<input type="file" id="uploadPrifile" title="" class="input-img" accept="image/*"/>*/}
                                <input accept="image/*" type="file" id="uploadPrifile" onChange={handleFileUpload} />
                            </div>
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> نام</label>
                            <input type="text" onChange={handleInformation("name")}
                                value={user?.name}
                            />
                        </div>
                        <div class="AZ-field-group">
                            <label for="">نام خانوادگی</label>
                            <input type="text" onChange={handleInformation("family")}
                                value={user?.family} />
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> دانشگاه </label>
                            <input type="text" value={user?.University} onChange={handleInformation("University")} />
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> رشته تحصیل </label>
                            <input type="text" value={user?.major} onChange={handleInformation("major")} />
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> خلاصه</label>
                            <textarea name="" id="" cols="30" rows="4"
                                onChange={handleInformation("BriefUser")}
                                value={user?.BriefUser}></textarea>
                        </div>
                        <div class="AZ-field-group add-hashtag-group">
                            <label for=""> مهارت‌ها </label>
                            <div class="group-field_inner d-flex align-items-center justify-content-between">
                                <input type="text" class="hashtags" id="hashtags" autocomplete="off"
                                    onChange={handleInformation("UserSkills")}
                                    value={user?.UserSkills} />
                                {/*<span class="icon-plus1"></span>*/}
                            </div>
                            <div class="tag-container"></div>
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> پروژه ها</label>
                            <textarea name="" id="" cols="30" rows="4"
                                onChange={handleInformation("UserProjects")}
                                value={user?.UserProjects}></textarea>
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> کد معرف (اختیاری) </label>
                            <input type="text" value={user.introducerid} placeholder="کد معرف " onChange={handleInformation("introducerid")} />
                        </div>
                        <div class="AZ-field-group">
                            <label for=""> شماره همراه </label>
                            <input type="text" value={user?.Mobile} onChange={handleInformation("Mobile")} />
                        </div>
                        <button type="submit" class="AZ-primary-btn w-100" onClick={handleUserInformation}> ورود به
                            برنامه
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>;
};
export default UserInformation;