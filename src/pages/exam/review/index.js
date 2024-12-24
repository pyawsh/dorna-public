import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {decodeHtml} from "../../projects/[...id]";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";

const ExamReviewQuestionsWithAnswers = () => {
    const {id} = useParams();
    const [questions, setQuestions] = useState();
    const [tab, setTab] = useState(0);

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

    return <section class="AZ-page-container AZ-test-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
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
                                return <>
                                    <div key={i} className="AZ-box">
                                        <div className="box-title mb-3"
                                             dangerouslySetInnerHTML={{__html: decodeHtml(q[0]?.question)}}/>
                                        <ul className="list-options mt-3">
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
export default ExamReviewQuestionsWithAnswers;