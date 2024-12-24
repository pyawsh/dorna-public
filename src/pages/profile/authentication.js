import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import { Button, DialogTitle, Modal, ModalClose, ModalDialog, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAuthentication = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);

    const [user, setUser] = useState([]);
    const id = localStorage.getItem("user_id");
    const [filename, setFilename] = useState({});

    const [fileUploaded0, setFileUploaded0] = useState(false);
    const [fileUploaded1, setFileUploaded1] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const getWorkshops = () => {
        if (!id) return;
        axios.get(`https://dorna-uni.ir/api/doapi?func=GetUserRoles&apikey=${process.env.REACT_APP_API_KEY}&id=43201`)
            .then(function (response) {
                setUser(() => response.data);
            }).catch(error => { });
    };
    const [initialImages, setInitialImages] = useState({
        UploadNationalId: "",
        UploadStudentCard: ""
    });
    useEffect(() => {
        if (!!initialImages.UploadNationalId) {
            setFileUploaded0(true);
            setFilename(old => ({...old, '0' : initialImages.UploadNationalId}))
        }
        if (!!initialImages.UploadStudentCard) {
            setFilename(old => ({...old, '1' : initialImages.UploadStudentCard}))
            setFileUploaded1(true);
        }
    }, [
        initialImages
    ]);
    const loadImages = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=searchcardsehraz&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setInitialImages(response?.data[0]);
            });
    };

    useEffect(() => {
        getWorkshops();
        loadImages();
        return () => {
            setUser([]);
        };
    }, []);

    const handleClick = () => {
        // alert("نوع کاربری شما با موفقیت انتخاب گردید.");
        setOpen(() => false);
    };


    const handleFileUpload = async (event, index) => {
        if (event.target.files.length === 0)
            return;

        setIsUploadingFile(true);

        switch (index) {
            case 0:
                setFileUploaded0(false);
                break;
            case 1:
                setFileUploaded1(false);
                break;
        }


        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        await axios
            .post(`${process.env.REACT_APP_API_GATEWAY}Uploader/UploadFile?apikey=${process.env.REACT_APP_API_KEY}`, formData)
            .then((response) => {
                if (response.data.error !== 0) return;
                setFilename((prev) => {
                    return {
                        ...prev,
                        [index]: response.data.error_msg
                    };
                });

                switch (index) {
                    case 0:
                        handleUploadImageSSN(response.data.error_msg, file);
                        break;
                    case 1:
                        handleUploadImageStudents(response.data.error_msg);
                        break;
                }
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });
        setIsUploadingFile(false);
    };


    async function handleUploadImageSSN(filename, file) {
        if (!filename || !id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/Doupdateapi?func=UploadUserIdcardImage&UploadNationalId=${filename}&apikey=${process.env.REACT_APP_API_KEY}&userid=${id}&ccid=${id}`)
            .then(function (response) {
                if (response.data.error !== 0) return;
                // setFileUploaded0(true);
                // loadImages(filename);
                // alert("با موفقیت انجام شد");
            });
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=updatecardsimage&apikey=${process.env.REACT_APP_API_KEY}&UploadNationalId=${filename}`)
            .then(async function (response) {
                if (response.data.error !== 0) return;
                setFileUploaded0(true);
                loadImages(filename);
            });
    }

    async function handleUploadImageStudents(filename, file) {
        if (!filename || !id) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/Doupdateapi?func=UploadUserStudentcardImage&UploadStudentCard=${filename}&apikey=${process.env.REACT_APP_API_KEY}&userid=${id}&ccid=${id}`)
            .then(function (response) {
                if (response.data.error !== 0) return;
                // setFileUploaded1(true);
                // alert("با موفقیت انجام شد");
            });
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=updatecardsimage&apikey=${process.env.REACT_APP_API_KEY}&UploadStudentCard=${filename}`)
            .then(async function (response) {
                if (response.data.error !== 0) return;
                setFileUploaded1(true);
                // loadImages(filename);
            });
    }


    function handleSendInfo(e) {
        e.preventDefault();
        e.stopPropagation();
        if (fileUploaded0 === false && fileUploaded1 === false) {
            setError('بارگذاری حداقل یک مورد از (کارت نظام پزشکی/مدارک شغلی) یا (عکس کارت دانشجویی) الزامی است');
        }
        else {
            setSuccess('تغییرات با موفقیت اعمال شد');
            setTimeout(() => {
                navigate(-1);
            }, 3000);
        }
        // alert('اطلاعات با موفقیت ارسال شد!');
    }
    return <section className="AZ-page-container AZ-panel">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3">
                        <div className="position-absolute" style={{ right: '10px', fontSize: '1.3em' }} onClick={() => setInfoModalOpen(true)}>
                            <i className="icon-info"></i>
                        </div>
                        <h2 className="page-header-title text-center d-flex align-items-center gap-1">احراز هویت</h2>
                        <HandlePreviousPageButton />
                    </div>
                    <form action="">
                        <div className="my-5">
                            <h1 className="text-center AZ-section-title">اپلود مدارک</h1>
                            <p className="text-center AZ-section-text"> کاربر عزیز برای احراز هویت و استفاده از قابلیت های
                                خاص،نیاز است مدارکی مبنی بر نوع کاربری انتخاب شده اپلود نمایید. </p>
                            <div className="mt-5">
                                <div onClick={() => setOpen(true)}
                                    className="authentication-link d-flex align-items-center gap-3 justify-content-between">
                                    <p><span className="icon-user"></span> نوع کاربری فعلی (عادی) </p>
                                    {/*<span className="icon-keyboard_arrow_left"></span>*/}
                                </div>
                                <div className={`authentication-link ${fileUploaded0 ? ' border-green' : ''}`}>
                                    <div
                                        className={`d-flex align-items-center gap-3 justify-content-between`}>
                                        <div>
                                            {/*<p><span className="icon-drivers-license-o"></span> گرفتن عکس از کارت ملی </p>*/}
                                            <div className="upload-profile-wrapper d-flex align-items-center gap-2">
                                                <span className="icon-drivers-license-o" />
                                                <label htmlFor="uploadPrifile0" className=" d-flex align-items-center">
                                                    گرفتن عکس از کارت نظام پزشکی / مدارک شغلی
                                                </label>
                                                <input type="file" id="uploadPrifile0" className={"d-none"} accept="image/png, image/jpeg, image/jpg"
                                                    onChange={(e) => handleFileUpload(e, 0)} />
                                            </div>
                                        </div>
                                        {fileUploaded0 === true ?
                                            <span className="icon-download1"></span>
                                            // <span className="icon-check"></span>
                                            :
                                            (
                                                isUploadingFile === true ?
                                                    <span className="icon-clock"></span>
                                                    :
                                                    <span className="icon-cross"></span>
                                            )

                                        }

                                    </div>
                                    {!!filename[0] &&
                                        <div className="mt-2" style={{ maxWidth: '100%' }}>
                                            <img style={{ width: '100%' }} src={`${process.env.REACT_APP_FILEMANAGER}${filename[0]}`} />
                                        </div>
                                    }
                                </div>
                                <div className={`authentication-link ${fileUploaded1 ? ' border-green' : ''}`}>

                                    <div
                                        className={`d-flex align-items-center gap-3 justify-content-between`}>
                                        <div>
                                            {/*<p><span className="icon-drivers-license-o"></span> اپلود عکس کارت دانشجویی </p>*/}
                                            <div className="upload-profile-wrapper d-flex align-items-center gap-2">
                                                <span className="icon-drivers-license-o" />
                                                <label htmlFor="uploadPrifile1" className=" d-flex align-items-center">اپلود
                                                    عکس کارت دانشجویی</label>
                                                <input type="file" id="uploadPrifile1" className={"d-none"} accept="image/png, image/jpeg, image/jpg"
                                                    onChange={(e) => handleFileUpload(e, 1)} />
                                            </div>
                                        </div>
                                        {fileUploaded1 === true ?
                                            <span className="icon-download1"></span>
                                            // <span className="icon-check"></span>
                                            :
                                            (
                                                isUploadingFile === true ?
                                                    <span className="icon-clock"></span>
                                                    :
                                                    <span className="icon-cross"></span>
                                            )

                                        }
                                    </div>
                                    {!!filename[1] &&
                                        <div className="mt-2" style={{ maxWidth: '100%' }}>
                                            <img style={{ width: '100%' }} src={`${process.env.REACT_APP_FILEMANAGER}${filename[1]}`} />
                                        </div>
                                    }
                                </div>
                                <button type="submit"
                                    onClick={handleSendInfo}
                                    className="AZ-primary-btn d-flex align-items-center justify-content-center gap-1 w-100 mt-5">تایید
                                    و ارسال
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>انتخاب نوع کاربری</DialogTitle>
                <div className="offcanvas-body small d-flex align-items-center justify-content-center flex-column">
                    {user?.map((u, i) => {
                        return <Button fullWidth onClick={handleClick} className={"mb-2"}
                            key={i}>{u.UserAppRoles}</Button>;
                    })}
                </div>
            </ModalDialog>
        </Modal>

        <Modal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} >
            <ModalDialog>
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <DialogTitle sx={{ mr: 4 }}>راهنمای صفحه</DialogTitle>
                <div className="offcanvas-body small d-flex align-items-center justify-content-center flex-column">
                    <img src="" alt="عکس راهنمای صفحه" />
                </div>
            </ModalDialog>
        </Modal>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'center' }}
            autoHideDuration={6000}
            open={error !== null}
            variant='outlined'
            color='danger'
            onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setError(null);
            }}
        >
            {error}
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'center' }}
            autoHideDuration={6000}
            open={success !== null}
            variant='outlined'
            color='success'
            onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setSuccess(null);
            }}
        >
            {success}
        </Snackbar>
    </section>;

};
export default UserAuthentication;