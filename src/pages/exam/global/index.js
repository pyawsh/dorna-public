import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../../components/share/BottomNavigation";
import moment from "moment-jalaali";

const GlobalExamList = () => {
    const [exam, setExam] = useState();
    const user_id = localStorage.getItem("user_id");
    const {id} = useParams();
    const navigate = useNavigate();

    const getExamDetail = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllAzmoonWithTagId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setExam(() => response.data);
            });
    };

    useEffect(() => {
        getExamDetail();
        return () => {
            setExam([]);
        };
    }, []);

    const handleOpenExam = (exam_id) => () => {
        const e = exam.filter(t => t.Id === exam_id)[0];
        if (e?.LetinExam !== "1") {
            // alert("مجاز به انجام آزمون در این زمان نمی باشد!");
            return;
        };
        const startDate = e.azmoonstartdate;
        const startHour = e.azmoonstarthour;

        const date = new Date().toLocaleString();
        const systemDate = moment(date, "M/D/YYYY, h:mm:ss A").format("jYYYY/jMM/jDD HH:mm:ss");

        const examDate = `${startDate} ${startHour}`;

        const examMoment = moment(examDate, "jYYYY/jMM/jDD HH:mm");
        const systemMoment = moment(systemDate, "jYYYY/jMM/jDD HH:mm:ss");

        if (systemMoment.isBefore(examMoment)) {
            // alert("مجاز به انجام آزمون نمی باشد!");
            return;
        }

        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Ifusertaketestbefore&apikey=${process.env.REACT_APP_API_KEY}&azmoonid=${exam_id}&userid=${user_id}`)
            .then(function (response) {
                if (response.data.length === 0) {
                    navigate(`/exam/preload/${exam_id}`);
                    localStorage.setItem("exam_time", e.azmoontimelimit);
                } else {
                    // alert("شما این آزمون را قبلا شرکت کرده اید.");
                }
            });
    };

    return <section class="AZ-page-container ">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> آزمون های جامع </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div>
                        {exam?.map((e, i) => {
                            return <div key={i} onClick={handleOpenExam(e.Id, i)} className="AZ-test-box">
                                <h4 className="test-box-title">آزمون
                                    &nbsp;
                                    {e.AzmoonTitle}
                                </h4>
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <p className="test-box-details d-flex align-items-center gap-1"><span
                                        className="icon-Vector1"></span> {e?.azmoonenddate}</p>
                                    <p className="test-box-details d-flex align-items-center gap-1"><span
                                        className="icon-Vector"></span> {e?.azmoonstarthour}</p>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};

export default GlobalExamList;