import BottomNavigation from "../../components/share/BottomNavigation";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import projectIcon from "../../assets/img/icons8-pharmacy-481.svg";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import {decodeHtml} from "./[...id]";
import LoadingComponent from "../../components/share/Loading";

const Projects = () => {
    const [projects, setProjects] = useState();

    const getAllProjects = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetallResearchProjects&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setProjects(() => response.data);
            });
    };

    useEffect(() => {
        getAllProjects();
        return () => {
            setProjects([]);
        };
    }, []);

    if(!projects)  return <LoadingComponent/>;

    return <section class="AZ-page-container AZ-research-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        {/*<Link to="/projects/add" class="AZ-primary-btn header-btn"> تعریف پروژه </Link>*/}
                        <h2 class="page-header-title text-center"> تحقیقاتی </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div>
                        {projects?.map((p, i) => {
                            return <Link key={i} to={`/projects/${p.Id}`}
                                         class="AZ-research-box d-flex align-items-start gap-3">
                                <img src={projectIcon} alt="" width="27px"/>
                                <div className="flex-grow-1">
                                    <h4 class="research-box-title">{p.projectname}</h4>
                                    <div className="research-box-text mt-3"
                                         dangerouslySetInnerHTML={{__html: decodeHtml(p.projectownerdesvription)}}/>
                                    <div class="d-flex align-items-center justify-content-between mt-3">
                                        <p class="research-box-details d-flex align-items-center gap-1"><span
                                            class="icon-Vector"></span>
                                            {p.ProjectDateSubmit ? p.ProjectDateSubmit : "---"}
                                            روز پیش </p>
                                        <p class="research-box-details d-flex align-items-center gap-1">قیمت
                                            : <span>{p.priceprojectowner}</span> ریال </p>
                                    </div>
                                </div>
                            </Link>;
                        })}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default Projects;