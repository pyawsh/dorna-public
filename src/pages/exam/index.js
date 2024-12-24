import BottomNavigation from "../../components/share/BottomNavigation";
import {useEffect, useState} from "react";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import axios from "axios";
import {Link} from "react-router-dom";
import {decodeHtml} from "../projects/[...id]";

const Exam = () => {
    const [tabs, setTabs] = useState(1);
    const [exam, setExam] = useState();
    const [tags, setTags] = useState([]);
    const [global, setGlobal] = useState();
    const [presentation, setPresentation] = useState([]);

    const getExamDetail = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAzmoonFirstPageDesc&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setExam(() => response.data[0]);
            });
    };

    const getAllTagsForExam = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllTagsForAzmoon&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    const tag = response.data[i].TagsForAzmoon;
                    if (tag === "جامع") {
                        setGlobal(response.data[i]);
                        delete response.data[i];
                    }
                }
                setTags(() => response.data);
            });
    };

    const getAllPresentation = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetALLPresentationWithCategory&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setPresentation(() => response.data);
            });
    };

    useEffect(() => {
        // eslint-disable-next-line default-case
        getAllTagsForExam();
        switch (tabs) {
            case 1:
                getExamDetail();
                break;
            case 3 :
                getAllPresentation();
                break;
        }
        return () => {
            setExam({});
        };
    }, [tabs]);

    const handleChangeTabs = (t) => {
        setTabs(prev => t);
    };

    return <section className="AZ-page-container AZ-education-page">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <div className="AZ-styled-select">
                            <select className="">
                                <option value=""> پزشکی</option>
                                <option value=""> پزشکی1</option>
                                <option value=""> پزشکی2</option>
                            </select>
                        </div>
                        <h2 className="page-header-title text-center"> آموزشی </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div
                        className="AZ-tabs-wrapper AZ-educational-tabs d-flex align-items-center justify-content-center gap-3 p-2 mb-4">
                        <ul className="tabs p-0 d-inline-flex align-items-center  justify-content-start w-100 gap-2">
                            <li className="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={() => handleChangeTabs(1)}
                                     className="tab-link active d-flex align-items-center justify-content-center flex-column"> آزمون
                                </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={() => handleChangeTabs(2)}
                                     className="tab-link d-flex align-items-center justify-content-center flex-column"> سوالات
                                    تفکیکی
                                </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={() => handleChangeTabs(3)}
                                     className="tab-link d-flex align-items-center justify-content-center flex-column"> جزوه
                                    و ارائه های آموزشی
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="tabContainer">

                        {tabs === 1 && <div id="tab1" className="tabContent">
                            <h5 className="AZ-section-title">آزمون جامع:</h5>
                            <div className="AZ-box">
                                <div className="AZ-section-text"
                                     dangerouslySetInnerHTML={{__html: decodeHtml(exam?.Azmoondescribtion)}}/>
                                <div className="d-flex align-items-center gap-2 justify-content-center mt-4">
                                    <Link to={`/exam/global/${global?.Id}`} className="AZ-primary-btn"> ورود به منوی
                                        آزمون‌های جامع </Link>
                                </div>
                            </div>
                        </div>}

                        {tabs === 2 && <div id="tab2" className="tabContent">
                            <div className="row">
                                {tags?.map((t, i) => {
                                    return <div className="col-6 mb-4">
                                        <Link to={`/exam/tag/${t.Id}`}
                                              className="AZ-version-category d-flex align-items-center gap-3 justify-content-center h-100 p-4">
                                            <img src={`${process.env.REACT_APP_FILEMANAGER}${t.ICON}`} alt=""/>
                                            <p className="version-category-text">{t.TagsForAzmoon}</p>
                                        </Link>
                                    </div>;
                                })}
                            </div>
                        </div>}

                        {tabs === 3 && <div id="tab3" className="tabContent">
                            <div>
                                {presentation?.map((p, i) => {
                                    return <a href={`/exam/presentation/${p.Id}`}
                                              className="AZ-faq-box d-flex align-items-center justify-content-between gap-3 ">
                                        <div>
                                            <p className="faq-number">{p.professorname}</p>
                                            <h4 className="faq-box-title">{p.contenttitle}</h4>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="icon-keyboard_arrow_left"></span>
                                        </div>
                                    </a>;
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
export default Exam;