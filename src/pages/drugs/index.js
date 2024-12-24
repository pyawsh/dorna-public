import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../components/share/BottomNavigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import LoadingComponent from "../../components/share/Loading";

const colors = ["green", "yellow", "purple", "blue", "pink", "orange"];

const Drugs = () => {
    const [drugs, setDrugs] = useState();
    const [shapes, setShapes] = useState();
    const [key, setKey] = useState();
    const [initial, setInitial] = useState(false);

    const getShapes = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllHandyDrugsShapes&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setShapes(() => response.data);
            });
    };

    const getDrugs = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllDrugInfo&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setDrugs(() => response.data);
            });
    };

    const handleSearch = async (value) => {
        if (!initial) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchDrugInfo&onvandaroinfo=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setDrugs(() => response?.data);
            });
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch(key);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [key]);


    const handleSearchOnThreads = e => {
        setInitial(true);
        const value = e.target.value;
        setKey(() => value);
    };

    const handleGetData = async () => {
        await getShapes();
        await getDrugs();
    };

    useEffect(() => {
        handleGetData();
        return () => {
            setDrugs([]);
            setShapes([]);
        };
    }, []);

    if(!shapes)  return <LoadingComponent/>;

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> فرموالسیون های ساختنی و داروهای ترکیبی </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearchOnThreads(e)}/>
                    </div>
                </div>
                <div class="col-lg-12 pl-0">
                    <div class="">
                        <div class="swiper productsCategorySwiper auto-slide">
                            <div class="swiper-wrapper">
                                {shapes?.map((s, i) => {
                                    return <div key={i} className="swiper-slide me-2">
                                        <div className={`AZ-product-category ${colors[i]}`}>
                                            <p>{s.HandydugsShapeShapes}</p>
                                        </div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="my-5">
                        <Swiper className="mySwiper" slidesPerView={3} spaceBetween={20}>
                            {drugs?.map((d, i) => {
                                return <SwiperSlide key={i}>
                                    <div className="swiper productsSwiper" key={i}>
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="AZ-product-card">
                                                    <Link to={`/drugs/${d.Id}`}>
                                                        <div className="product-card-img AZ-img-container">
                                                            <div className="AZ-img-container-inner AZ-img-cover">
                                                                <img
                                                                    src={`${process.env.REACT_APP_FILEMANAGER}${d.druginfopic}`}
                                                                    alt=""/>
                                                            </div>
                                                        </div>
                                                        <h4 className="product-card-name">{d.onvandaroinfo}</h4>
                                                        {/*<p className="product-card-text">{d.drugnameinfo}</p>*/}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>;
                            })}
                        </Swiper>

                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default Drugs;