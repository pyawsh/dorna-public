import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {decodeHtml} from "../projects/[...id]";

const WorkShopById = () => {
    const [workshop, setWorkshop] = useState();
    const {id} = useParams();

    const getWorkshops = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetWorkShopById&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setWorkshop(() => response.data[0]);
            });
    };

    useEffect(() => {
        getWorkshops();
        return () => {
            setWorkshop([]);
        };
    }, []);

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center">جزییات ورک‌شاپ</h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div>
                        <img src={`${process.env.REACT_APP_FILEMANAGER}${workshop?.WorkshopCover}`} alt=""
                             width="100%"/>
                    </div>
                    <div class="AZ-box mb-4">
                        <h4 class="box-title">{workshop?.WorkshopTitle}</h4>
                        <p class="box-text"> معرفی دوره: </p>
                        <div className="AZ-section-text"
                             dangerouslySetInnerHTML={{__html: decodeHtml(workshop?.workshopdescription)}}/>
                    </div>
                    <div class="AZ-box mb-4">
                        <p class="box-text d-flex align-items-center gap-2"><span class="icon-group"></span> تعداد
                            دانشجویان : <span>{workshop?.Contributers}</span></p>
                        <p class="box-text d-flex align-items-center gap-2"><span class="icon-group"></span> مدرس دوره
                            : <span>{workshop?.workshopteacher}</span></p>
                        <p class="box-text d-flex align-items-center gap-2"><span class="icon-education"></span> نوع
                            دوره: <span>{workshop?.typeofwokshop}</span></p>
                        <p class="box-text d-flex align-items-center gap-2"><span class="icon-Vector"></span> مدت
                            زمان: <span>{workshop?.timeperiode}</span></p>
                        <p class="box-text d-flex align-items-center gap-2"><span class="icon-Vector1"></span> تاریخ و
                            ساعت: <span>{workshop?.Date}</span></p>
                    </div>
                    <div class="AZ-box mb-4">
                        <h4 class="box-text text-center"> قیمت دوره : </h4>
                        <p class="course-price text-center"><span> {workshop?.workshopprice}  </span> ريال </p>
                    </div>
                    <div
                       class="AZ-primary-btn w-100 my-4 d-flex align-items-center justify-content-center"> ثبت نام
                        دوره </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;

};
export default WorkShopById;