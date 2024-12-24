import BottomNavigation from "../../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import axios from "axios";
import {useEffect, useState} from "react";
import BarChart from "../../../components/share/BarChart";

const ExamResultFullReport = () => {
    const id = localStorage.getItem("user_id");
    const [exam, setExam] = useState();
    const [chData, setChData] = useState();

    const getExamDetail = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetALLuserExamsRanks&apikey=${process.env.REACT_APP_API_KEY}&userid=${id}`)
            .then(function (response) {
                const data = response.data;
                setExam(() => data);
                const help = [];
                for (let i = 0; i < data.length; i++) {
                    const title = data[i].Exam;
                    const score = data[i].Score;
                    const r = {
                        name: title,
                        pv: score,
                        uv: 100
                    };
                    help.push(r);
                }
                setChData(() => help);
            });
    };

    useEffect(() => {
        getExamDetail();
        return () => {
            setExam([]);
        };
    }, []);

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> کارنامه کامل </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    {chData && chData.length > 0 && <div class="AZ-box mb-3">
                        <BarChart data={chData}/>
                    </div>}

                    {exam && exam.length > 0 ? <>
                        <div class="AZ-box mb-3">
                            <ul class="AZ-faq-list">
                                {exam?.map((e, i) => {
                                    return <li className="d-flex align-items-center  justify-content-between gap-2">
                                        <p>{e.Exam} </p>
                                        <span>{e.Score}%</span>
                                    </li>;
                                })}
                            </ul>
                        </div>
                        <div class="AZ-box mb-3">
                            <ul class="AZ-faq-list">
                                {exam?.map((e, i) => {
                                    return <li className="d-flex align-items-center  justify-content-between gap-2">
                                        <p>{e.Exam} </p>
                                        <span>{e.Rank}</span>
                                    </li>;
                                })}
                            </ul>
                        </div>
                        <div class="d-flex align-items-center gap-2 justify-content-center mt-4">
                            <a href="#" class="AZ-primary-btn"> بروزرسانی کارنامه </a>
                        </div>
                    </> : <div className={'mx-auto my-auto w-auto h-auto'}>اطلاعاتی برای نمایش وجود ندارد!</div>}
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;

};

export default ExamResultFullReport;