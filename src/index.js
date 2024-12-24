import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
//styles
import "./assets/main.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//pages
import HtmlError from "./pages/htmlError";
import Welcome from "./pages/welcome";
import Auth from "./pages/auth";
import SendOtp from "./pages/auth/otp";
import User from "./pages/auth/user";
import Prescription from "./pages/prescription";
import PrescriptionId from "./pages/prescription/[...id]";
import PrescriptionAdd from "./pages/prescription/add";
import PrescriptionFileId from "./pages/prescription/file/[...id]";
import NewsById from "./pages/news/[...id]";
import Home from "./pages/home";
import Profile from "./pages/profile";
import UserInformation from "./pages/profile/information";
import Notification from "./pages/notification";
import News from "./pages/news";
import Exam from "./pages/exam";
import ExamPreload from "./pages/exam/preload";
import Projects from "./pages/projects";
import ProjectsId from "./pages/projects/[...id]";
import ProjectsAdd from "./pages/projects/add";
import OtcPage from "./pages/disease";
import OtcAdd from "./pages/disease/add";
import DiseaseId from "./pages/disease/[...id]";
import DiseaseIntroId from "./pages/disease/[[...id]]";
import Products from "./pages/products";
import ProductById from "./pages/products/[...id]";
import WorkshopsPage from "./pages/workshops";
import WorkshopsByIdPage from "./pages/workshops/[...id]";
import Tech from "./pages/tech";
import TechById from "./pages/tech/[...id]";
import ExamSimulator from "./pages/exam/simulator";
import ExamSingle from "./pages/exam/single";
import ExamGlobal from "./pages/exam/global";
import PresentationId from "./pages/exam/presentation/[...id]";
import UserWorkshops from "./pages/profile/workshops";
import UserCredit from "./pages/profile/credit";
import UserInvite from "./pages/profile/invite";
import UserSupport from "./pages/profile/support";
import Thread from "./pages/thread";
import TestRecord from "./pages/profile/test-record";
import Authentication from "./pages/profile/authentication";
import UserProfile from "./pages/profile/user-profile";
import Drugs from "./pages/drugs";
import DrugById from "./pages/drugs/[...id]";
import ExamResultById from "./pages/exam/result/[...id]";
import ExamWithTag from "./pages/exam/tag";
import ExamWithTagId from "./pages/exam/tag/[...id]";
import ExamReviewQuestionsWithAnswers from "./pages/exam/review";
import ExamResultFullReport from "./pages/exam/result/full-report";
import ExamSimulatorList from "./pages/exam/simulator/list";
import ExamSimulatorReview from "./pages/exam/simulator/review";
import WebinarTechById from "./pages/tech/webinar";
import ExamToggledQuestions from "./pages/exam/toggle";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Welcome/>}/>
                        <Route path="home" element={<Home/>}/>
                        <Route path="notification" element={<Notification/>}/>
                        <Route path="*" element={<HtmlError/>}/>
                    </Route>
                    <Route path="/auth">
                        <Route index element={<Auth/>}/>
                        <Route path="otp" element={<SendOtp/>}/>
                        <Route path="user" element={<User/>}/>
                    </Route>
                    <Route path="/tech">
                        <Route index element={<Tech/>}/>
                        <Route path=":id" element={<TechById/>}/>
                        <Route path="webinar/:id" element={<WebinarTechById/>}/>
                    </Route>
                    <Route path="/exam">
                        <Route index element={<Exam/>}/>
                        <Route path="preload/:id" element={<ExamPreload/>}/>
                        <Route path="simulator/:id" element={<ExamSimulator/>}/>
                        <Route path="simulator/list/:id" element={<ExamSimulatorList/>}/>
                        <Route path="simulator/exam/review/:id" element={<ExamSimulatorReview/>}/>
                        <Route path="single" element={<ExamSingle/>}/>
                        <Route path="global/:id" element={<ExamGlobal/>}/>
                        <Route path="presentation/:id" element={<PresentationId/>}/>
                        <Route path="result/:id/:examid" element={<ExamResultById/>}/>
                        <Route path="tag/:id" element={<ExamWithTag/>}/>
                        <Route path="tag/review/:id" element={<ExamWithTagId/>}/>
                        <Route path="review/:id" element={<ExamReviewQuestionsWithAnswers/>}/>
                        <Route path="full-report" element={<ExamResultFullReport/>}/>
                        <Route path="toggle/:id" element={<ExamToggledQuestions/>}/>
                    </Route>
                    <Route path="/disease">
                        <Route index element={<OtcPage/>}/>
                        <Route path="add" element={<OtcAdd/>}/>
                        <Route path=":id" element={<DiseaseId/>}/>
                        <Route path="intro/:id" element={<DiseaseIntroId/>}/>
                    </Route>
                    <Route path="/projects">
                        <Route index element={<Projects/>}/>
                        <Route path=":id" element={<ProjectsId/>}/>
                        <Route path="add" element={<ProjectsAdd/>}/>
                    </Route>
                    <Route path="/products">
                        <Route index element={<Products/>}/>
                        <Route path=":id" element={<ProductById/>}/>
                    </Route>
                    {/*<Route path="/drugs">*/}
                    {/*    <Route index element={<Drugs/>}/>*/}
                    {/*    <Route path=":id" element={<DrugById/>}/>*/}
                    {/*</Route>*/}
                    <Route path="/workshops">
                        <Route index element={<WorkshopsPage/>}/>
                        <Route path=":id" element={<WorkshopsByIdPage/>}/>
                    </Route>
                    <Route path="/news">
                        <Route index element={<News/>}/>
                        <Route path=":id" element={<NewsById/>}/>
                    </Route>
                    <Route path="/thread">
                        <Route index element={<Thread/>}/>
                    </Route>
                    <Route path="/profile">
                        <Route index element={<Profile/>}/>
                        <Route path="information" element={<UserInformation/>}/>
                        <Route path="user" element={<User/>}/>
                        <Route path="workshops" element={<UserWorkshops/>}/>
                        <Route path="credit" element={<UserCredit/>}/>
                        <Route path="invite" element={<UserInvite/>}/>
                        <Route path="support" element={<UserSupport/>}/>
                        <Route path="test-record" element={<TestRecord/>}/>
                        <Route path="user-profile" element={<UserProfile/>}/>
                        <Route path="auth" element={<Authentication/>}/>
                    </Route>
                    <Route path="/prescription">
                        <Route index element={<Prescription/>}/>
                        <Route path=":id" element={<PrescriptionId/>}/>
                        <Route path="add" element={<PrescriptionAdd/>}/>
                        <Route path="file/:id" element={<PrescriptionFileId/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App/>
);