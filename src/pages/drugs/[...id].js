import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const DrugById = () => {
    const [drug, setDrug] = useState();
    const [tab, setTab] = useState(1);
    const {id} = useParams();

    const getDrugInfo = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllDrugInfo&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setDrug(() => response.data[0]);
            });
    };

    useEffect(() => {
        getDrugInfo();
        return () => {
            setDrug([]);
        };
    }, []);

    if (!drug) {
        return "درحال بارگیری...";
    }

    const handleChangeTab = (t) => () => {
        setTab(prev => t);
    };

    return <section class="AZ-page-container AZ-product-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center">{drug?.onvandaroinfo}</h2>
                        <HandlePreviousPageButton/>
                    </div>
                </div>
                <div class="col-lg-12 px-0">
                    <div class="swiper gallerySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="gallery-img AZ-img-container">
                                    <div class="AZ-img-container-inner AZ-img-cover">
                                        <img src={`${process.env.REACT_APP_FILEMANAGER}${drug?.druginfopic}`} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <h1 class="product-name">{drug?.drugnameinfo}</h1>
                    <div class="AZ-tabs-wrapper d-flex align-items-center justify-content-center gap-3 mb-4">
                        <ul class="tabs p-0 d-inline-flex align-items-center  justify-content-start w-md-100">
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(1)}
                                     class="tab-link active d-flex align-items-center justify-content-center flex-column"> جزییات
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(2)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column"> ترکیبات
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(3)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column"> اشکال
                                    و دوز های موجود
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(4)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column"> روش
                                    تهیه
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tabContainer">

                        {tab === 1 && <div id="tab1" class="tabContent">
                            <ul class="product-details">
                                <li class="d-flex align-items-center gap-4 py-2">
                                    <p> حجم </p>
                                    <span>{drug?.druginfodose}</span>
                                </li>
                                <li class="d-flex align-items-center gap-4 py-2">
                                    <p> نوع </p>
                                    <span>{drug?.druginfoshapes}</span>
                                </li>
                                {/*<li class="d-flex align-items-center gap-4 py-2">*/}
                                {/*    <p> فاقد </p>*/}
                                {/*    <span>{drug?.NotIncludedDaroTarkibi}</span>*/}
                                {/*</li>*/}
                                <li class="d-flex align-items-center gap-4 py-2">
                                    <p> ویژگی </p>
                                    <span>{drug?.Drugnameinfobrand}</span>
                                </li>
                            </ul>
                        </div>}

                        {tab === 2 && <div id="tab2" class="tabContent">
                            {/*<ul class="product-details">*/}
                            {/*    <li class="d-flex align-items-center gap-4 py-2">*/}
                            {/*        <p> ترکیبات </p>*/}
                            {/*        <div className="AZ-section-text mb-3" dangerouslySetInnerHTML={{ __html: decodeHtml(drug?.ingredientDaroTarkibi) }} />*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>}

                        {tab === 3 && <div id="tab3" class="tabContent">
                            {/*<ul class="product-details">*/}
                            {/*    <li class="d-flex align-items-center gap-4 py-2">*/}
                            {/*        <p> اشکال </p>*/}
                            {/*        <span>{drug?.HandyDrugShape}</span>*/}
                            {/*    </li>*/}
                            {/*    <li class="d-flex align-items-center gap-4 py-2">*/}
                            {/*        <p> دوزهای موجود </p>*/}
                            {/*        <span>{drug?.DoseandShape}</span>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default DrugById;