import BottomNavigation from "../../../components/share/BottomNavigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import PieChartComponent from "../../../components/share/PieChart";

const ExamResultById = () => {
    const [result, setResult] = useState();
    const {id, examid} = useParams();
    const [chData, setChData] = useState();

    const getExamDetail = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAzmoonResultByid&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                const data = response.data[0];
                setResult(() => data);
                const percent = data.nomreyakolikarbarazmoon * 100;
                const help = [
                    { name: 'Group A', value: percent },
                    { name: 'Group B', value: 100 - percent },
                ];
                setChData(help)
            });
    };


    useEffect(() => {
        getExamDetail();
        return () => {
            setResult([]);
        };
    }, []);

    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center"> کارنامه </h2>
                        {/*<HandlePreviousPageButton/>*/}
                    </div>
                    <div>
                        <h1 className="AZ-section-title text-center"> نمره بدون احساب نمره منفی </h1>
                        <h1 className="AZ-section-text text-center"> نمره با احساب نمره منفی </h1>
                    </div>
                    {chData && <PieChartComponent data={chData}/>}

                    <div>
                        <div>تعداد کل سوالات: {result?.allquestions}</div>
                        <div>نمره: {result?.nomreyakolikarbarazmoon.split('.')[1]} %</div>
                        <div>
                            <span>پاسخ صحیح: {result?.correct}</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 justify-content-center mt-4">
                        <Link to={`/exam/full-report`} className="AZ-primary-btn"> کارنامه کامل </Link>
                        <Link to={`/exam/simulator/exam/review/${examid}`} className="AZ-secondary-btn"> مرور
                            سوالات </Link>
                        <Link to={`/exam/toggle/${examid}`} className="AZ-secondary-btn saved-questions-btn"> سوالات
                            نشان شده </Link>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;

};
export default ExamResultById;