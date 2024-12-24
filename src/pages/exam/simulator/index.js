import BottomNavigation from "../../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import axios from "axios";
import {useEffect, useState} from "react";
import {decodeHtml} from "../../projects/[...id]";
import {Link, useParams} from "react-router-dom";

const ExamSimulator = () => {
    const [exam, setExam] = useState([]);
    const {id} = useParams();

    const getExamDetail = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAzmoonShabihsazDescribtion&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].Shabihsazdescribtionchoosing === "1") {
                        setExam((prev) => [...prev, response.data[i]]);
                    }
                }
            });
    };

    useEffect(() => {
        getExamDetail();
        return () => {
            setExam({});
        };
    }, []);

    const mExam = exam[0];

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> توضیحات آزمون شبیه ساز </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="AZ-box">
                        <div className="AZ-section-text mb-3"
                             dangerouslySetInnerHTML={{__html: decodeHtml(mExam?.Shabihsazdescribtion)}}/>
                    </div>
                    <div class="d-flex align-items-center gap-2 justify-content-center mt-4">
                        <Link to={`/exam/simulator/list/${id}`} class="AZ-primary-btn"> شروع آزمون </Link>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default ExamSimulator;