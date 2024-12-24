import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import axios from "axios";
import {useEffect, useState} from "react";

const TestRecord = () => {
    const [records, setRecords] = useState();
    const token = localStorage.getItem('token');

    const getRecords = () => {
        if(!token)return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserExamWithToken&apikey=${process.env.REACT_APP_API_KEY}&token=${token}`)
            .then(function (response) {
                setRecords(() => response.data);
            });
    };

    useEffect(() => {
        getRecords();
        return () => {
            setRecords([]);
        };
    }, []);

    return <section className="AZ-page-container AZ-panel">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3">
                        <h2 className="page-header-title text-center d-flex align-items-center gap-1"> سوابق
                            آزمون‌ها </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div>
                        <div className="AZ-box mb-4">
                            <div className="AZ-styled-select">
                                <select className="">
                                    <option value=""> ماه اخیر</option>
                                    <option value=""> 2ماه اخیر</option>
                                    <option value=""> 3ماه اخیر</option>
                                </select>
                            </div>
                            <canvas id="BarChartCanvas"></canvas>
                        </div>
                        {records?.map((r, i) => {
                            return <div key={i}
                                        className="AZ-box mb-4 d-flex align-items-center gap-2 justify-content-between">
                                <div className="d-flex flex-column gap-2">
                                    <h4 className="AZ-section-text">{r.onvanazmoon}</h4>
                                    <p className="test-date d-flex align-items-center gap-1"><span
                                        className="icon-Vector1"></span> کل سوالات: {r.allquestions} </p>
                                </div>
                                <div className="single-chart" data-num="60">
                                    <svg className="circular-chart " viewBox="0 0 36 36">
                                        <path className="circle-bg"
                                              d="M18 2.0845
                                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path className="circle"
                                              d="M18 2.0845
                                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                              stroke-dasharray="60, 100"
                                        />
                                        <text className="percentage" x="18" y="20.35">{r.nomreyakolikarbarazmoon}</text>
                                    </svg>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>;
};
export default TestRecord;