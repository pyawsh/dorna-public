import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import {decodeHtml} from "../projects/[...id]";

const ExamToggledQuestions = () => {
    const {id} = useParams();
    const [questions, setQuestions] = useState();
    const [tab, setTab] = useState(0);
    const toggled = localStorage.getItem("toggle_q");
    let mToggle = {};
    const getExamDetail = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetQuestionByExamid&apikey=${process.env.REACT_APP_API_KEY}&examid=${id}`)
            .then(function (response) {
                const groupedData = response?.data?.reduce((acc, item) => {

                    if (!acc[item.Id]) {
                        acc[item.Id] = [];
                    }
                    acc[item.Id].push(item);
                    return acc;
                }, {});

                let help = {};

                try {
                    mToggle = JSON.parse(toggled) || {};
                } catch (e) {
                    console.error("Failed to parse JSON:", e);
                    mToggle = {};  // Fallback to an empty object if parsing fails
                }

                const tArr = Object.keys(mToggle);

                for (let i = 0; i < tArr.length; i++) {
                    const val = tArr[i];
                    help[val] = groupedData[val];
                }

                setQuestions(() => Object.values(help));
            });
    };

    useEffect(() => {
        getExamDetail();
        return () => {
            setQuestions([]);
        };
    }, [id]);

    const handleChangeTab = () => {
        if (tab === questions?.length - 1) return;
        setTab(prev => prev + 1);
    };

    return <section class="AZ-page-container AZ-test-page">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center"> مرور سوالات آزمون </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    {toggled && questions?.length > 0 ? <form id="createSubdomainForm" class="w-100">
                        <ul id="progressbar" class="mt-5">
                            {questions?.map((q, i) => {
                                return <li onClick={() => setTab(i)} class={tab === i ? "active" : ""}><p> {i + 1} </p>
                                </li>;
                            })}
                        </ul>
                        <fieldset>
                            {questions?.map((q, i) => {
                                if (tab !== i) return;
                                return <>
                                    <div key={i} className="AZ-box">
                                        <div className="box-title mb-3"
                                             dangerouslySetInnerHTML={{__html: decodeHtml(q[0]?.question)}}/>
                                        <ul className="list-options mt-3">
                                            <hr/>
                                            {q.map((question, i) => {
                                                return <li key={i} className="py-1">
                                                    <div className="AZ-radio-group">
                                                        <input type="radio" id="q1" name="group1"
                                                               checked={question.gozinehdorost === "1"}/>
                                                        <label htmlFor="q1">{question.gozineh}</label>
                                                    </div>
                                                </li>;
                                            })}
                                        </ul>
                                    </div>
                                </>;
                            })}
                            <div className="d-flex align-items-center justify-content-between m-2">
                                <div className="w-100">
                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                        <Link to={"/profile/support"} class="report-btn d-flex align-items-center"
                                              data-bs-toggle="collapse" role="button" aria-expanded="false"
                                              aria-controls="collapseExample">گزارش خطای سوال </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="btns-group d-flex align-items-center justify-content-center gap-2 mt-5">
                                <input type="button" onClick={handleChangeTab} name="next"
                                       class="next action-button AZ-primary-btn flex-grow-1"
                                       value="سوال بعدی"/>
                            </div>
                        </fieldset>
                    </form> : 'برای مشاهده سوالات میباست آنها را نشان دار کنید.'}
                </div>
            </div>
        </div>
    </section>;
};
export default ExamToggledQuestions;