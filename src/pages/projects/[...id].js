import BottomNavigation from "../../components/share/BottomNavigation";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import userInformation from "../../assets/img/user-info.png";
import projectIcon from "../../assets/img/icons8-pharmacy-481.svg";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";

export const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

const ProjectId = () => {
    const {id} = useParams();
    const user_id = localStorage.getItem("user_id");
    const [project, setProject] = useState();
    const [userRequest, setUserRequest] = useState();

    const getProjectInfo = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetResearchProjectbyId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setProject(prev => response.data[0]);
            });
    };

    useEffect(() => {
        getProjectInfo();
        return () => {
            setProject([]);
        };
    }, []);

    const handleProjectRequest = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=UploadResearchProjectSuggestion&researcherfullname=${user_id}&researcherdescription=${userRequest}&apikey=${process.env.REACT_APP_API_KEY}&pccid=${id}&userid=${user_id}`)
            .then(function (response) {
                setUserRequest("");
                // alert("درخواست شما با موفقیت ارسال شد.");
                setUserRequest(prev => "");
            });
    };


    const handleUserRequestMsg = () => (e) => {
        setUserRequest(prev => e.target.value);
    };

    return <section class="AZ-page-container AZ-research-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> تحقیقاتی </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div>
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <img src={projectIcon} alt="" width="25px"/>
                            <h1 class="research-details-title">{project?.projectname}</h1>
                        </div>
                        <div class=" d-flex align-items-center gap-3 mb-4">
                            <div class="author-profile AZ-img-container">
                                <div class="AZ-img-container-inner AZ-img-cover">
                                    <img src={userInformation} alt=""/>
                                </div>
                            </div>
                            <h5 class="research-author">{project?.nameprojectowner}</h5>
                        </div>
                        <h4 class="AZ-section-title"> توضیحات </h4>
                        <div class="AZ-section-text mb-3"
                             dangerouslySetInnerHTML={{__html: decodeHtml(project?.projectownerdesvription)}}/>
                        <ul class="mb-4">
                            <li class="d-flex align-items-center gap-4 py-2">
                                <p class="AZ-section-title m-0">زمان پیشنهادی : </p>
                                <span class="AZ-section-text">
                                  {project?.projectownertiming ? project.projectownertiming : "---"}
                                    ماه </span>
                            </li>
                            <li class="d-flex align-items-center gap-4 py-2">
                                <p class="AZ-section-title m-0"> قیمت : </p>
                                {project?.priceprojectowner ?
                                    <p className="research-box-details d-flex align-items-center gap-1">
                                        <span>{project.priceprojectowner}</span> ریال </p>
                                    : <span className="AZ-section-text">توافقی </span>
                                }
                            </li>
                        </ul>
                        <form action="">
                            <div class="AZ-field-group">
                                <label for=""> ثبت درخواست </label>
                                <textarea value={userRequest} name="" id="" cols="30" rows="5" placeholder="متن درخواست"
                                          onChange={handleUserRequestMsg()}> </textarea>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="AZ-primary-btn" onClick={handleProjectRequest}> ارسال
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default ProjectId;