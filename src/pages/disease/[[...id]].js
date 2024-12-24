import { useParams } from "react-router-dom";
import BottomNavigation from "../../components/share/BottomNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import { decodeHtml } from "../projects/[...id]";
import { getImage } from "../../utils/images";

const DiseaseIntroId = () => {
    const { id } = useParams();
    const [intro, setIntro] = useState();
    const [tab, setTab] = useState(1);

    const handleGetDiseaseIntro = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetOtcCase&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setIntro(() => response.data[0]);
            });
    };

    useEffect(() => {
        handleGetDiseaseIntro();
        return () => {
            setIntro([]);
        };
    }, []);

    const handleChangeTab = (t) => () => {
        setTab(prev => t);
    };

    let fullstars = 0;
    // let Ostars = 0;
    if (intro) {
        try {
            fullstars = Number(intro.StarsCount);
            // Ostars = (5 - fullstars) > 0 ? (5 - fullstars) : 0;
        } catch (error) {

        }
    }

    return <section class="AZ-page-container AZ-education-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> {intro?.OtcDiseaseName} </h2>
                        <HandlePreviousPageButton />
                    </div>
                    <div class="mb-4">
                        <img src={`${process.env.REACT_APP_FILEMANAGER}${getImage(intro?.OtcPic)}`} alt="" width="100%" />
                        <div class="d-flex align-items-center justify-content-between mt-4">
                            <h1 class="details-disease-title">{intro?.Onvan}</h1>
                            <div class="stars d-flex align-items-center gap-1">
                                {/*<span class="icon-star-o"></span>*/}
                                {/*<span class="icon-star"></span>*/}
                                {/*<span class="icon-star"></span>*/}
                                {/*<span class="icon-star"></span>*/}
                                {[...Array(fullstars)].map(e => {
                                    return <span className="icon-star"></span>;
                                })}
                                {/* {[...Array(Ostars)].map(e => {
                                    return <span className="icon-star-o"></span>;
                                })} */}
                            </div>
                        </div>
                    </div>
                    <div
                        class="AZ-tabs-wrapper AZ-educational-tabs d-flex align-items-center justify-content-center gap-3 p-2 mb-4">
                        <ul class="tabs p-0 d-inline-flex align-items-center  justify-content-start w-100 gap-2">
                            <li class={`d-flex align-items-center justify-content-center flex-column ${tab === 1 ? 'active' : ''}`}>
                                <div onClick={handleChangeTab(1)}
                                    class="tab-link d-flex align-items-center justify-content-center flex-column"> معرفی
                                    بیمار
                                </div>
                            </li>
                            <li class={`d-flex align-items-center justify-content-center flex-column ${tab === 2 ? 'active' : ''}`}>
                                <div onClick={handleChangeTab(2)}
                                    class="tab-link d-flex align-items-center justify-content-center flex-column"> دارو
                                    درمانی
                                </div>
                            </li>
                            <li class={`d-flex align-items-center justify-content-center flex-column ${tab === 3 ? 'active' : ''}`}>
                                <div onClick={handleChangeTab(3)}
                                    class="tab-link d-flex align-items-center justify-content-center flex-column"> اقدام
                                    نهایی
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tabContainer">

                        {tab === 1 && <div id="tab1" class="tabContent">
                            <p class="AZ-section-text">

                                <div dangerouslySetInnerHTML={{ __html: decodeHtml(intro?.OtcCase) }}>
                                </div>
                            </p>
                        </div>}

                        {tab === 2 && <div id="tab2" class="tabContent">
                            <p class="AZ-section-text">
                                <div dangerouslySetInnerHTML={{ __html: decodeHtml(intro?.OtcCure) }}>
                                </div>
                                {/* {intro?.OtcCure} */}
                            </p>
                        </div>}

                        {tab === 3 && <div id="tab3" class="tabContent">
                            <p class="AZ-section-text">
                                <div dangerouslySetInnerHTML={{ __html: decodeHtml(intro?.LastStep) }}>
                                </div>
                                {/* {intro?.LastStep} */}
                            </p>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation />
    </section>;
};
export default DiseaseIntroId;