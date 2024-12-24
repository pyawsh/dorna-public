import axios from "axios";
import {useEffect, useState} from "react";
import userInformation from "../../assets/img/user-info.png";
import {useNavigate} from "react-router-dom";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";

const UserInformation = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [user, setUser] = useState({
        Name: "",
        Family: "",
        University: "",
        major: "",
        Briefuser: "",
        userskil: "",
        userprojects: ""
    });
    const [filename, setFilename] = useState("");
    const id = localStorage.getItem("user_id");

    const getUserProfile = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getallinformationuser&apikey=${process.env.REACT_APP_API_KEY}&token=${token}&id=${id}`)
            .then(function (response) {
                const data = response.data[0];
                if (!data || data.length === 0) return;
                const array = Object.keys(data);
                const rFirstName = data.Name;
                const rLastName = data.Family;
                setFilename(data.uploadphoto);
                for (let i = 0; i < array.length; i++) {
                    const index = array[i];
                    setUser(prev => {
                        return {
                            ...prev,
                            [index]: data[index]
                        };
                    });
                }

                setUser((prev)=>{
                    return {
                        ...prev,
                        name : rFirstName,
                        family:  rLastName
                    }
                })
            });
    };

    useEffect(() => {
        getUserProfile();
        return () => {
            setUser([]);
        };
    }, []);

    const handleInformation = (key) => (e) => {
        setUser(prev => {
            return {
                ...prev,
                [key]: e.target.value
            };
        });
    };

    const updateUserInformation = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=UploadUserInformation&name=${user.name}&family=${user.family}&University=${user.University}&major=${user.major}&Briefuser=${user.Briefuser}&userskil=${user.userskil}&userprojects=${user.userprojects}&apikey=${process.env.REACT_APP_API_KEY}&userid=${id}&ccid=${id}`)
            .then(function () {
                // alert("اطلاعات کاربر با موفقیت به روزرسانی شد.");
                navigate("/profile");
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

    const handleUploadUserProfileImage = async () => {
        if (!filename) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/Doupdateapi?func=UploadUserImageprofile&uploadphoto=${filename}&apikey=${process.env.REACT_APP_API_KEY}&userid=${id}&ccid=${id}`)
            .then(function (response) {
                console.log(response);
            });
    };


    const handleChangeUserInformation = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await updateUserInformation();
        await handleUploadUserProfileImage();
    };

    const goBack = () => {
        navigate(-1);
    };

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3">
                        <h2 class="page-header-title text-center d-flex align-items-center gap-1">اطلاعات کاربری</h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <form onSubmit={handleChangeUserInformation}>
                        <div>
                            <div class="upload_image d-flex align-items-center flex-column mb-5">
                                <div class="position-relative">
                                    <div class="preview-profile-img AZ-img-container">
                                        <div class="AZ-img-container-inner AZ-img-cover">
                                            <img id="imgPreview" src={!!filename ? process.env.REACT_APP_FILEMANAGER+filename : userInformation} class="preview1"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="upload-profile-wrapper">
                                    <label for="uploadPrifile" class=" d-flex align-items-center"><span
                                        class="icon-camera"></span></label>
                                    {/*<input type="file" id="uploadPrifile" title="" class="input-img" accept="image/*"/>*/}
                                    <input type="file" accept="image/*" id="uploadPrifile" onChange={handleFileUpload}/>
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
                                       value={user?.family}/>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> دانشگاه </label>
                                <input type="text" value={user?.University} onChange={handleInformation("University")}/>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> رشته تحصیل </label>
                                <input type="text" value={user?.major} onChange={handleInformation("major")}/>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> خلاصه</label>
                                <textarea name="" id="" cols="30" rows="4"
                                          onChange={handleInformation("Briefuser")}
                                          value={user?.Briefuser}></textarea>
                            </div>
                            <div class="AZ-field-group add-hashtag-group">
                                <label for=""> مهارت‌ها </label>
                                <div class="group-field_inner d-flex align-items-center justify-content-between">
                                    <input type="text" class="hashtags" id="hashtags" autocomplete="off"
                                           onChange={handleInformation("userskil")}
                                           value={user?.userskil}/>
                                    {/*<span class="icon-plus1"></span>*/}
                                </div>
                                <div class="tag-container"></div>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> پروژه ها</label>
                                <textarea name="" id="" cols="30" rows="4"
                                          onChange={handleInformation("userprojects")}
                                          value={user?.userprojects}></textarea>
                            </div>
                            <div class="d-flex align-items-center gap-4 justify-content-end">
                                <button type="button" class="AZ-secondary-btn cancel-form-btn" onClick={goBack}> لغو</button>
                                <button type="submit" class="AZ-primary-btn save-form-btn"> ذخیره</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>;
};
export default UserInformation;