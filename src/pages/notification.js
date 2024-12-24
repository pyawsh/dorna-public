import BottomNavigation from "../components/share/BottomNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
import HandlePreviousPageButton from "../components/share/HandlePreviousPageButton";
import { decodeHtml } from "./projects/[...id]";
import { Link } from "react-router-dom";
import LoadingComponent from "../components/share/Loading";

const Notification = () => {
    const [workshops, setWorkshops] = useState();
    const [purchases, setPurchases] = useState();
    const [tabState, useTabState] = useState(1);

    useEffect(() => {
        localStorage.setItem('bottom_link', 1)
    }, []);

    const getTopFiveWorkshops = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTopFiveWorkshop&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setWorkshops(() => response.data);
            });
    };

    const getTopFivePurchasePackages = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTopFivePurchasePackage&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setPurchases(() => response.data);
            });
    };

    useEffect(() => {
        // eslint-disable-next-line default-case
        getTopFivePurchasePackages();
        getTopFiveWorkshops();

        // switch (tabState) {
        //     case 1 :
        //         getTopFiveWorkshops();
        //         break;
        //     case 2 :
        //         getTopFivePurchasePackages();
        //         break;
        //     case 3:
        //         getTopFivePurchasePackages();
        //         getTopFiveWorkshops();
        //         break;
        // }
        return () => {
            setPurchases([]);
            setWorkshops([]);
        };
    }, [tabState]);

    const handleChangeTabs = (t) => {
        useTabState(() => t);
    };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        switch (tabState) {
            case 1:
                if (!workshops) return setLoading(true);
                else setLoading(false);
                break;
            case 2:
                if (!purchases) return setLoading(true);
                else setLoading(false);
                break;
            case 3:
                if (!workshops || !purchases) setLoading(true);
                else setLoading(false);
                break;
            default:
                setLoading(false);
        }
    }, [workshops, purchases])

    return <>
        <section class="AZ-page-container AZ-notif-page">
            {loading === true ? <LoadingComponent /> :
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                                <h2 class="page-header-title text-center"> اعلان‌ها </h2>
                                <HandlePreviousPageButton />
                            </div>
                            <div class="AZ-tabs-wrapper d-flex align-items-center justify-content-center gap-3 mb-4">
                                <ul class="tabs p-0 d-inline-flex align-items-center  justify-content-start w-md-100">
                                    <li class="d-flex align-items-center justify-content-center flex-column">
                                        <div onClick={() => handleChangeTabs(1)}
                                            class="tab-link active d-flex align-items-center justify-content-center flex-column"> امروز
                                        </div>
                                    </li>
                                    <li class="d-flex align-items-center justify-content-center flex-column">
                                        <div onClick={() => handleChangeTabs(2)}
                                            class="tab-link d-flex align-items-center justify-content-center flex-column">دیروز
                                        </div>
                                    </li>
                                    <li class="d-flex align-items-center justify-content-center flex-column">
                                        <div onClick={() => handleChangeTabs(3)}
                                            class="tab-link d-flex align-items-center justify-content-center flex-column"> همه
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="tabContainer file-">

                                {tabState === 1 && <div id="tab1" class="tabContent">
                                    <div class="">
                                        {workshops?.map((w, i) => {
                                            return <div key={i} className="notif-item d-flex align-items-start gap-3">
                                                <div className="notif-img red d-flex align-items-center justify-content-center">
                                                    <span className="icon-presentation-board"></span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                                        <h4 className="notif-title">{w.WorkshopTitle}</h4>
                                                        <p className="notif-date d-flex align-items-center gap-2">{w.dateworkshopcontentcreated}<span></span>
                                                        </p>
                                                    </div>
                                                    <div className="notif-text text-overflow"
                                                        dangerouslySetInnerHTML={{ __html: decodeHtml(w.workshopdescription) }} />
                                                </div>
                                            </div>;
                                        })}
                                        {purchases?.map((p, i) => {
                                            return <div key={i} className="notif-item d-flex align-items-start gap-3">
                                                <div className="notif-img red d-flex align-items-center justify-content-center">
                                                    <span className="icon-presentation-board"></span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                                        <h4 className="notif-title">با پرداخت
                                                            {p.rialdorna}
                                                            ریال
                                                            {p.dornacodevalue}
                                                            دریافت کنید.</h4>
                                                        <p className="notif-date d-flex align-items-center gap-2">{p.datedornavaluesubmit ? p.datedornavaluesubmit : "---"}<span></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>;
                                        })}
                                    </div>
                                </div>}

                                {tabState === 2 && <div id="tab2" class="tabContent">
                                    {workshops?.map((w, i) => {
                                        return <div key={i} className="notif-item d-flex align-items-start gap-3">
                                            <div className="notif-img red d-flex align-items-center justify-content-center">
                                                <span className="icon-presentation-board"></span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div
                                                    className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                                    <h4 className="notif-title">{w.WorkshopTitle}</h4>
                                                    <p className="notif-date d-flex align-items-center gap-2">{w.dateworkshopcontentcreated}<span></span>
                                                    </p>
                                                </div>
                                                <div className="notif-text text-overflow"
                                                    dangerouslySetInnerHTML={{ __html: decodeHtml(w.workshopdescription) }} />
                                            </div>
                                        </div>;
                                    })}
                                    {purchases?.map((p, i) => {
                                        return <div key={i} className="notif-item d-flex align-items-start gap-3">
                                            <div className="notif-img red d-flex align-items-center justify-content-center">
                                                <span className="icon-presentation-board"></span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div
                                                    className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                                    <h4 className="notif-title">با پرداخت
                                                        {p.rialdorna}
                                                        ریال
                                                        {p.dornacodevalue}
                                                        دریافت کنید.</h4>
                                                    <p className="notif-date d-flex align-items-center gap-2">{p.datedornavaluesubmit ? p.datedornavaluesubmit : "---"}<span></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>;
                                    })}
                                </div>}

                                {tabState === 3 && <div id="tab3" class="tabContent">
                                    {workshops?.map((w, i) => {
                                        return <div key={i} className="notif-item d-flex align-items-start gap-3">
                                            <div className="notif-img red d-flex align-items-center justify-content-center">
                                                <span className="icon-presentation-board"></span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div
                                                    className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                                    <h4 className="notif-title">{w.WorkshopTitle}</h4>
                                                    <p className="notif-date d-flex align-items-center gap-2">{w.dateworkshopcontentcreated}<span></span>
                                                    </p>
                                                </div>
                                                <div className="notif-text text-overflow"
                                                    dangerouslySetInnerHTML={{ __html: decodeHtml(w.workshopdescription) }} />
                                            </div>
                                        </div>;
                                    })}
                                    {purchases?.map((p, i) => {
                                        return <div key={i} className="notif-item d-flex align-items-start gap-3">
                                            <div className="notif-img red d-flex align-items-center justify-content-center">
                                                <span className="icon-presentation-board"></span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div
                                                    className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                                    <h4 className="notif-title">با پرداخت
                                                        {p.rialdorna}
                                                        ریال
                                                        {p.dornacodevalue}
                                                        دریافت کنید.</h4>
                                                    <p className="notif-date d-flex align-items-center gap-2">{p.datedornavaluesubmit ? p.datedornavaluesubmit : "---"}<span></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>;
                                    })}
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
            }
            <BottomNavigation />
        </section>
    </>

};
export default Notification;