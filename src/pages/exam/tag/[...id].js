import {Link, useParams} from "react-router-dom";
import BottomNavigation from "../../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";

const ExamWithTagId = () => {
    const {id} = useParams();

    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center">بانک سوالات درس فارماسیوتیکس
                            مبحث فارماسیوتیکس </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div className="AZ-box">
                        <ul className="AZ-faq-list">
                            <li>تعداد سواالت آزمون و پراکندگی سواالت از هر درس استاندارد و مطابق با آزمون جامع 1٨٠ واحدی
                                می باشد.
                            </li>
                            <li>گزینه دوم: بررسی سواالت آزمون به صورت تک تک : )سواالت آزمون برای شما به نمایش در آمده و
                                می توانید به صورت تک تک پاسخ خود را داده و پاسخ صحیح را بررسی کنید
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 justify-content-center mt-4">
                        <Link to={`/exam/review/${id}`} className="AZ-primary-btn"> ورود به بخش سوالات </Link>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;

};
export default ExamWithTagId;