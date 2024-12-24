import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {decodeHtml} from "../../projects/[...id]";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";

const SimulatorExamReview = () => {
    const {id} = useParams();
    const [questions, setQuestions] = useState();
    const [tab, setTab] = useState(0);
    const exam_user_result = localStorage.getItem("exam_user_result");
    const [result, setResult] = useState([]);

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

                setQuestions(() => Object.values(groupedData));
            });
    };

    useEffect(() => {
        getExamDetail();
        return () => {
            setQuestions([]);
        };
    }, []);

    const handleChangeTab = () => {
        if (tab === questions?.length - 1) return;
        setTab(prev => prev + 1);
    };

    const user_result = JSON.parse(exam_user_result);

    useEffect(() => {
        const rArray = Object.keys(user_result);
        for (let i = 0; i < rArray.length; i++) {
            const r = rArray[i];
            const result = user_result[r].id;
            setResult(prev => [...prev, result]);
        }
    }, []);

    return <section class="AZ-page-container AZ-test-page">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center"> مرور سوالات آزمون </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <form id="createSubdomainForm" class="w-100">
                        <ul id="progressbar" class="mt-5">
                            {questions?.map((q, i) => {
                                return <li onClick={() => setTab(i)} class={tab === i ? "active" : ""}><p> {i + 1} </p>
                                </li>;
                            })}
                        </ul>
                        <fieldset>
                            {questions?.map((q, i) => {
                                if (tab !== i) return;
                                const r = result[i];
                                const mR = q.filter(s =>s.GozinehId === r);
                                console.log(q);
                                return <>
                                    <div key={i} className="AZ-box">
                                        <div className="box-title mb-3"
                                             dangerouslySetInnerHTML={{__html: decodeHtml(q[0]?.question)}}/>
                                        <ul className="list-options mt-3">
                                            جواب شما گزینه:
                                            {mR[0].gozineh}
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
                                            <hr/>
                                            پاسخ تشریحی:
                                            <div className="AZ-section-text"
                                                 dangerouslySetInnerHTML={{__html: decodeHtml(q[0].DescribtionAnswer)}}/>
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
                    </form>
                </div>
            </div>
        </div>
    </section>;
};
export default SimulatorExamReview;
