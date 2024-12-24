import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {decodeHtml} from "../projects/[...id]";
import LoadingComponent from "../../components/share/Loading";

const TechPage = () => {
    const [tab, setTab] = useState(1);
    const [tech, setTech] = useState();
    const [webinar, setWebinar] = useState();
    const [key, setKey] = useState();
    const [initial, setInitial] = useState(false);

    const handleChangeTab = (t) => {
        setTab(prev => t);
    };

    const getTechBios = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTechBio&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setTech(() => response.data);
            });
    };

    const getWebinars = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetWebinars&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setWebinar(() => response.data);
            });
    };

    useEffect(() => {
        switch (tab) {
            case 1:
                getTechBios();
                break;
            case 2:
                getWebinars();
                break;
        }
        return () => {
            setTech([]);
        };
    }, [tab]);


    const handleSearch = async (value) => {
        if (!initial) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchPagefortythree&techttitle=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setTech(() => response?.data);
            });
    };

    const handleSearchWebinar = async (value) => {
        // {{LocalHost}}api/doapi?func=SearchWebinars&amp;webinarname=دا&amp;apikey={{apiKey}}
        if (!initial) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchWebinars&webinarname=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setWebinar(() => response?.data);
            });
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            switch (tab) {
                case 1 :
                    handleSearch(key);
                    break;
                case 2:
                    handleSearchWebinar(key);
                    break;
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [key]);

    const handleSearchOnTech = e => {
        setInitial(true);
        const value = e.target.value;
        setKey(() => value);
    };

    if (!tech) return <LoadingComponent/>;


    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> Tech and Bioinformatic </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearchOnTech(e)}/>
                    </div>
                    <div class="AZ-tabs-wrapper d-flex align-items-center justify-content-center gap-3 mb-4">
                        <ul class="tabs p-0 d-inline-flex align-items-center  justify-content-start w-md-100">
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={() => handleChangeTab(1)}
                                     class="tab-link active d-flex align-items-center justify-content-center flex-column"> مطالب
                                    علمی
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={() => handleChangeTab(2)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column"> وبینارها
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tabContainer">

                        {tab === 1 && <div id="tab1" class="tabContent">
                            <div>
                                {tech?.map((t, i) => {

                                    return <Link to={`/tech/${t.Id}`} key={i} className="AZ-post-card-horizontal">
                                        {t.ContentCover &&
                                            <Link to={`/tech/${t.Id}`} className="post-horizontal-img AZ-img-container">
                                                <div className="AZ-img-container-inner AZ-img-cover">
                                                    <img src={`${process.env.REACT_APP_FILEMANAGER}${t.ContentCover}`}
                                                         alt=""/>
                                                </div>
                                            </Link>}
                                        <div className="flex-grow-1">
                                            {t.techttitle &&
                                                <span className="post-card-category">{t?.techttitle}</span>}
                                            {t.techshortdescription && <Link to={`/tech/${t?.Id}`}>
                                                <p className="post-horizontal-title">
                                                    <div
                                                        dangerouslySetInnerHTML={{__html: decodeHtml(t?.techshortdescription)}}/>
                                                </p>
                                            </Link>}
                                            <div
                                                className="d-flex align-items-center justify-content-between gap-2 mt-3">
                                                {t.estimatetime && <Link to={`/tech/${t?.Id}`}
                                                                         className="post-card-clock d-flex align-items-center gap-1"> <span
                                                    className="icon-Vector"></span>
                                                    {t?.estimatetime}
                                                    ساعت </Link>}
                                                {t.writer && <Link to={`/tech/${t?.Id}`}
                                                                   className="post-card-writer d-flex align-items-center gap-1"> <span
                                                    className="icon-user"></span>{t?.writer}</Link>}
                                            </div>
                                        </div>
                                    </Link>;
                                })}
                            </div>
                        </div>}

                        {tab === 2 && <div id="tab2" class="tabContent">
                            <div>
                                {webinar?.map((t, i) => {
                                    return <Link to={`/tech/webinar/${t.Id}`} key={i}
                                                 className="AZ-post-card-horizontal">
                                        {t.WebinarImage && <div className="post-horizontal-img AZ-img-container">
                                            <div className="AZ-img-container-inner AZ-img-cover">
                                                <img src={`${process.env.REACT_APP_FILEMANAGER}${t.WebinarImage}`}
                                                     alt=""/>
                                            </div>
                                        </div>}
                                        {t.webinarcoverpic && <div className="post-horizontal-img AZ-img-container">
                                            <div className="AZ-img-container-inner AZ-img-cover">
                                                <img src={`${process.env.REACT_APP_FILEMANAGER}${t.webinarcoverpic}`}
                                                     alt=""/>
                                            </div>
                                        </div>}
                                        <div className="flex-grow-1">
                                            {t.WebinarCategory &&
                                                <span className="post-card-category">{t?.WebinarCategory}</span>}
                                            {t.webinarCategory &&
                                                <span className="post-card-category">{t?.WebinarCategory}</span>}
                                            {t.WebinarName && <div>
                                                <p className="post-horizontal-title">
                                                    <div
                                                        dangerouslySetInnerHTML={{__html: decodeHtml(t?.WebinarName)}}/>
                                                </p>
                                            </div>}
                                            {t.webinarname && <div>
                                                <p className="post-horizontal-title">
                                                    <div
                                                        dangerouslySetInnerHTML={{__html: decodeHtml(t?.webinarname)}}/>
                                                </p>
                                            </div>}
                                            <div
                                                className="d-flex align-items-center justify-content-between gap-2 mt-3">
                                                {t.TimeWebinar && <div
                                                    className="post-card-clock d-flex align-items-center gap-1"> <span
                                                    className="icon-Vector"></span>
                                                    {t?.TimeWebinar}
                                                    ساعت
                                                </div>}
                                                {t.webinartime && <div
                                                    className="post-card-clock d-flex align-items-center gap-1"> <span
                                                    className="icon-Vector"></span>
                                                    {t?.webinartime}
                                                    ساعت
                                                </div>}
                                                {t.writer && <div
                                                    className="post-card-writer d-flex align-items-center gap-1"> <span
                                                    className="icon-user"></span>{t?.writer}</div>}
                                            </div>
                                        </div>
                                    </Link>;
                                })}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default TechPage;