import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../components/share/BottomNavigation";
import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Modal, Sheet, Typography} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";
import {decodeHtml} from "../projects/[...id]";

const ExamPreload = () => {
    const [exam, setExam] = useState([]);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    const getExamDetail = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAzmoonJameeDecribtion&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].AzmmonjameeDescribtionchoosing === "1") {
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

    function handleOpenModal() {
        navigate(`/exam/simulator/${id}`);
        // setModal(prev => true);
    }

    const handleNavigate = (route) => () => {
        navigate(route);
    };

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> آزمون جامع: </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div className="AZ-box">
                        <div className="AZ-section-text mb-3"
                             dangerouslySetInnerHTML={{__html: decodeHtml(mExam?.AzmmonjameeDescribtion)}}/>
                    </div>
                    <div class="d-flex align-items-center gap-2 justify-content-center mt-4">
                        <button type={"button"} onClick={handleOpenModal} class="AZ-primary-btn"> ورود به آزمون</button>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={modal}
            onClose={() => setModal(false)}
            sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    borderRadius: "md",
                    p: 3,
                    boxShadow: "lg",
                }}
            >
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >مایل به انتخاب کدام نوع از آزمون هستید؟</Typography>
                <div className={"d-flex gap-2 mt-5"}>
                    <a href={"/exam/simulator"}><Button>آزمون شبیه ساز</Button></a>
                    <a href={"/exam/single"}><Button>بررسی سواالت آزمون به صورت تک تک</Button></a>
                </div>
            </Sheet>
        </Modal>
    </section>;
};
export default ExamPreload;