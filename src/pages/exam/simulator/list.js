import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {decodeHtml} from "../../projects/[...id]";
import {Button, DialogTitle, Modal, ModalDialog, Stack} from "@mui/joy";

const ExamSimulatorList = () => {
    const {id} = useParams();
    const user_id = localStorage.getItem("user_id");
    const [questions, setQuestions] = useState();
    const [tab, setTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [openRate, setOpenRate] = useState(false);
    const [result, setResult] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [range, setRange] = useState(1);
    const [rateId, setRateId] = useState(1);
    const navigate = useNavigate();
    const examTime = localStorage.getItem("exam_time");
    const [toggle, setToggle] = useState();
    const [time, setTime] = useState(() => {
        return examTime ? examTime : 0;
    });

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

    const handleChangeTabPositive = () => {
        if (tab === questions?.length - 1) return;
        setTab(prev => prev + 1);
    };
    const handleChangeTabNegative = () => {
        if (tab === 0) return;
        setTab(prev => prev - 1);
    };

    const handleChangeQuestionResult = (qId, id, is_answer) => () => {
        setInitialized(true);
        setResult(prev => {
            return {
                ...prev,
                [qId]: {id: id, is_answer: is_answer}
            };
        });
    };

    useEffect(() => {
        if (!initialized) return;
        localStorage.setItem("exam_record", JSON.stringify(result));
    }, [result]);

    useEffect(() => {
        if (initialized) return;
        const r = localStorage.getItem("exam_record");
        // setResult(() => JSON.parse(r));
        return () => {
            setResult({});
        };
    }, []);

    const handleSubmitExamQuestions = async (q_id, q_a_id, is_answer, bonus) => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=gizinehayeentekabi&onvansoalkarbarazmoon=${q_a_id}&karbarazmoongozineh=${q_a_id}&javabsahihgozine=${is_answer ? "1" : "0"}&onvanazmoon=${id}&Bounus=${bonus}&apikey=${process.env.REACT_APP_API_KEY}&userid=${user_id}`)
            .then(function (response) {
            });
    };

    const handleSubmitExam = async () => {
        localStorage.setItem("exam_user_result", JSON.stringify(result));
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=ExamSabt&apikey=${process.env.REACT_APP_API_KEY}&userid=${user_id}&examid=${id}`)
            .then(function (response) {
                if (response.data.error === -1) return;
                navigate(`/exam/result/${response.data[0].ID}/${id}`);
            }).catch(() => {
                throw "خطا";
            });
    };

    const handleFinishExam = async (time_finished = false) => {
        const rArray = Object.keys(result);
        localStorage.setItem('toggle_q',JSON.stringify(toggle));
        if (time_finished) {
            navigate('/exam');
        }
        // if (rArray.length !== questions.length) {
        //     alert("تکمیل کردن تمامی سوالات الزامی است!");
        //     return;
        // }
        if (!user_id) return;
        for (let i = 0; i < rArray.length; i++) {
            const id = rArray[i];
            const mResult = result[id];
            try {
                await handleSubmitExamQuestions(id, mResult.id, mResult.is_answer, mResult.bonus);
            } catch (err) {
                // alert("با مشکل مواجه شد");
            }
        }
        await handleSubmitExam();
    };

    useEffect(() => {
        let sec = examTime;

        const timerId = setInterval(() => {
            setTime(sec);
            sec--;

            if (sec === 0) {
                clearInterval(timerId);
                // alert("زمان آزمون به پایان رسیده است.");
                handleFinishExam(true);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const handleChange = (e) => {
        setRange(e.target.value);
    };


    function handleOpenRate(id) {
        setRateId(id);
        setOpenRate(true);
    }

    function handleSetRateResult() {
        if (result[rateId] === undefined) {
            // alert("ابتدا پاسخ سوال را تکمیل نمایید.");
            setOpenRate(false);
            return;
        }
        result[rateId].bonus = range;
        setOpenRate(false);
        setRange(1);
    }

    const toggleQuestion = (id) => {
        setToggle(prev => {
            return {
                ...prev,
                [id]: 1
            };
        });
        // alert('ذخیره سوال انجام شد.')
    };

    return <section class="AZ-page-container AZ-test-page">
        <div class="container">
            <div class="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between position-relative py-3 mb-4">
                        <div onClick={() => setOpen(true)} class="AZ-secondary-btn"
                             data-bs-target="#completionTestModal"
                             data-bs-toggle="modal"> اتمام آزمون
                        </div>
                        <time
                            class="countdown amazing-offer-time short-time d-flex flex-row-reverse justify-content-evenly"
                            date-time="2025-12-25 00:00:00">
                            <span id="timer">{time ?? "---"}</span>
                        </time>
                    </div>
                    <form id="createSubdomainForm" className="w-100">
                        {/*<div className="d-flex align-items-center justify-content-between mb-2">*/}
                        {/*    <a className="sidebar-menu" data-bs-toggle="offcanvas" href="#offcanvasExample"*/}
                        {/*       role="button" aria-controls="offcanvasExample"><span className="icon-menu"></span></a>*/}
                        {/*    <span className="qu-number"> سوال {tab + 1} </span>*/}
                        {/*    <a href="#" className="save-btn"><span className="icon-bookmark_outline"></span></a>*/}
                        {/*</div>*/}
                        <ul id="progressbar" className="mt-5">
                            {questions?.map((q, i) => {
                                return <li onClick={() => setTab(i)} className={tab === i ? "active" : ""}>
                                    <p> {i + 1} </p></li>;
                            })}
                        </ul>

                        <fieldset>
                            {questions?.map((q, i) => {
                                if (tab !== i) return;
                                return <>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <a className="sidebar-menu" data-bs-toggle="offcanvas" href="#offcanvasExample"
                                           role="button" aria-controls="offcanvasExample"></a>
                                        <span className="qu-number"> سوال {tab + 1} </span>
                                        <div onClick={() => toggleQuestion(q[0].Id)} className="save-btn"><span
                                            className="icon-bookmark_outline"></span></div>
                                    </div>
                                    <div key={i} className="AZ-box">
                                        <div className="box-title mb-3"
                                             dangerouslySetInnerHTML={{__html: decodeHtml(q[0]?.question)}}/>
                                        <ul className="list-options mt-3">
                                            {q.map((question, i) => {
                                                return <li key={i} className="py-1">
                                                    <div className="AZ-radio-group">
                                                        <input type="radio" id={i} name="group1"
                                                               onClick={handleChangeQuestionResult(question.Id, question.GozinehId, question.gozinehdorost === "1")}/>
                                                        <label htmlFor={i}>{question.gozineh}</label>
                                                    </div>
                                                </li>;
                                            })}
                                        </ul>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between m-2">
                                        <div className="w-100">
                                            <div className="d-flex align-items-center justify-content-between gap-2">
                                                <div
                                                    className="report-btn d-flex align-items-center"
                                                    data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false"
                                                    aria-controls="collapseExample">
                                                </div>
                                                <div onClick={() => handleOpenRate(q[0].Id)}
                                                     className="d-flex align-items-center gap-2"
                                                     data-bs-target="#scoringModal"
                                                     data-bs-toggle="modal">
                                                    {/*<span className="rate-qu">4.9/5</span>*/}
                                                    <div className="stars d-flex align-items-center gap-1">
                                                        <span className="icon-star-o"></span>
                                                        <span className="icon-star"></span>
                                                        <span className="icon-star"></span>
                                                        <span className="icon-star"></span>
                                                        <span className="icon-star"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>;
                            })}
                            <div className="btns-group d-flex align-items-center justify-content-center gap-2 mt-5">
                                <input type="button" onClick={handleChangeTabNegative} name="next"
                                       className="next action-button AZ-secondary-btn flex-grow-1"
                                       value="سوال قبلی"/>
                                <input type="button" onClick={handleChangeTabPositive} name="next"
                                       className="next action-button AZ-primary-btn flex-grow-1"
                                       value="سوال بعدی"/>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>ایا مایل به اتمام ازمون هستید؟</DialogTitle>
                <Stack spacing={2}>
                    <div className="d-flex justify-content-between">
                        <Button onClick={handleFinishExam}>بله</Button>
                        <Button color={"danger"} onClick={() => setOpen(false)}>خیر</Button>
                    </div>
                </Stack>
            </ModalDialog>
        </Modal>
        <Modal open={openRate} onClose={() => setOpenRate(false)}>
            <ModalDialog>
                <DialogTitle></DialogTitle>
                <Stack spacing={2}>
                    <div className="d-flex align-items-center gap-2">
                        <span className="icon-star"></span>
                        {range}
                    </div>
                    {range >= 1 && range < 3 ? "چی بود بابا" : range >= 3 && range < 5 ? "بد نبود" : "دست خوش حال کردم"}
                    <input type="range" min="1" max="5" onChange={handleChange}/>
                    <div className="d-flex justify-content-between">
                        <Button onClick={handleSetRateResult}>ثبت امتیاز</Button>
                        <Button color={"danger"} onClick={() => setOpenRate(false)}>انصراف</Button>
                    </div>
                </Stack>
            </ModalDialog>
        </Modal>
    </section>;
};
export default ExamSimulatorList;