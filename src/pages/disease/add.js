import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/share/Loading";

const OtcPage = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const goBack = () => {
        navigate(-1);
    };
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState({
        Onvan: "",
        OtcCase: "",
        LastStep: "",
        OtcCure: "",
        OtcPic: "",
    });
    const [username, setUsername] = useState("");
    const [filename, setFilename] = useState([]);
    const loadPage = async () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getallinformationuser&apikey=${process.env.REACT_APP_API_KEY}&token=${token}&id=${id}&ccid=${id}`)
            .then(function (response) {
                const data = response.data[0];
                if (!data || data.length === 0) return;
                try {
                    setUsername(`${data["Name"]} ${data["Family"]}`.trim());
                } catch (error) {}
            });
    };
    useEffect(() => {
        loadPage();
    }, []);

    const handleInformation = (key) => (e) => {
        setPatient(prev => {
            return {
                ...prev,
                [key]: e.target.value
            };
        });
    };

    const submit = async (e) => {
        setLoading(true);
        e.preventDefault();
        e.stopPropagation();
        let caseId = await updateInsertCaseOtp();
        // await handleUploadCaseImages(caseId);
        setLoading(false);
        goBack();
    };

    const updateInsertCaseOtp = async () => {
        let caseId = null;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/Doupdateapi?func=InsertCaseOtp&Onvan=${patient.Onvan}&OtcCase=${patient.OtcCase}&
OtcCure=${patient.OtcCure}&LastStep=${patient.LastStep}&OtcPic=${filename.join("$$")}&apikey=${process.env.REACT_APP_API_KEY}&username=${username}&userid=${id}`)
            .then(function (response) {
                if (response.data.error === -1) {
                    console.log(response.data.error);
                    return;
                }
                console.log(response);
                caseId = response.data.id;
            });
        return caseId;
    };
    const handleFileUpload = async (event) => {
        for (let index = 0; index < event.target.files.length; index++) {
            const file = event.target.files[index];

            // const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            await axios
                .post(`${process.env.REACT_APP_API_GATEWAY}Uploader/UploadFile?apikey=${process.env.REACT_APP_API_KEY}`, formData)
                .then((response) => {
                    if (response.data.error !== 0) return;
                    setFilename(old => [...old, response.data.error_msg]);
                })
                .catch((error) => {
                    // handle errors
                    console.log(error);
                });
        }
    };
    const handleUploadCaseImages = async (caseId) => {
        if (filename.length < 0) return;
        for (let index = 0; index < filename.length; index++) {
            const file = filename[index];

            await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/Doupdateapi?func=UploadOtcPic&OtcPic=${file}&apikey=${process.env.REACT_APP_API_KEY}&id=${caseId}&userid=${id}`)
                .then(function (response) { });
        }
    };

    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center"> بیمار </h2>
                        <HandlePreviousPageButton />
                    </div>

                    <form onSubmit={submit}>
                        <div>
                            <div class="AZ-field-group">
                                <label for=""> عنوان کیس</label>
                                <input type="text" onChange={handleInformation("Onvan")}
                                    value={patient?.Onvan} placeholder="عنوان کیس"
                                />
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> معرفی بیمار</label>
                                <textarea name="" id="" cols="30" rows="4"
                                    onChange={handleInformation("OtcCase")} placeholder="معرفی بیمار"
                                    value={patient?.OtcCase}></textarea>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> اقدام نهایی</label>
                                <textarea name="" id="" cols="30" rows="4"
                                    onChange={handleInformation("LastStep")} placeholder="اقدام نهایی"
                                    value={patient?.LastStep}></textarea>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> دارو درمانی</label>
                                <textarea name="" id="" cols="30" rows="4"
                                    onChange={handleInformation("OtcCure")} placeholder="دارو درمانی"
                                    value={patient?.OtcCure}></textarea>
                            </div>
                            <div class="AZ-field-group">
                                <label for=""> رسانه </label>
                                <label class="file">
                                    <div class="file__input d-flex flex-column align-items-center justify-content-center">
                                        <div className="d-flex flex-wrap align-items-center">
                                            {filename.map(url =>
                                                <div className="col col-sm-4 overflow-hidden d-flex justify-content-center align-items-center" style={{ aspectRatio: '1/1' }}>
                                                    <img src={process.env.REACT_APP_FILEMANAGER + url} alt="عکس اپلود شده" style={{ width: '100%', padding: '10px', borderRadius: '10px' }} />
                                                </div>
                                            )}
                                        </div>
                                        <span class="icon-add_photo_alternate" style={{ textDecoration: 'none' }}></span>
                                        <input accept="image/*" class="file__input--file" id="media-input" type="file" multiple="multiple" onChange={handleFileUpload} />
                                        <label class="file__input--label" for="media-input" data-text-btn="آپلود">رسانه مورد نظر را اپلود کنید</label>
                                    </div>
                                    <div class="preview my-2"></div>
                                </label>
                            </div>
                            <div class="d-flex align-items-center gap-4 justify-content-end">
                                <button type="button" disabled={loading} class="AZ-secondary-btn cancel-form-btn" onClick={goBack}> لغو</button>
                                <button type="submit" disabled={loading} class="AZ-primary-btn save-form-btn">{loading === true ? 'در حال ذخیره' : 'ذخیره'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <BottomNavigation />
    </section>;

};
export default OtcPage;