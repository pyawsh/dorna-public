import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../components/share/BottomNavigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadingComponent from "../../components/share/Loading";

const WorkshopsPage = () => {
    const [workshops, setWorkshops] = useState();
    const [key, setKey] = useState();
    const [initial, setInitial] = useState(false);

    const getWorkshops = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=AllWorkShop&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setWorkshops(() => response.data);
            });
    };

    useEffect(() => {
        getWorkshops();
        return () => {
            setWorkshops([]);
        };
    }, []);


    const handleSearch = async (value) => {
        if (!initial) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchWorkshops&WorkshopTitle=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setWorkshops(() => response?.data);
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

    const handleSearchOnWorkShop = e => {
        setInitial(true);
        const value = e.target.value;
        setKey(() => value);
    };

    if (!workshops) return <LoadingComponent/>;


    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> ورکشاپ‌ها </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearchOnWorkShop(e)}/>
                    </div>
                    <div>
                        {workshops?.map((w, i) => {
                            return <div className="AZ-workshop-card mb-3">
                                {w.workshopcover &&
                                    <Link to={`/workshops/${w.Id}`} className="workshop-card-img AZ-img-container">
                                        <div className="AZ-img-container-inner AZ-img-cover">
                                            <img src={`${process.env.REACT_APP_FILEMANAGER}${w.workshopcover}`} alt=""/>
                                        </div>
                                    </Link>}
                                <div className="d-flex align-items-center justify-content-between gap-1 flex-wrap">
                                    <p className="workshop-card-teacher"> مدرس :
                                        {w.Workshopteacher ? w.Workshopteacher : "---"}
                                    </p>
                                    <div className="stars">
                                        {w.Stars ? w.Stars : "---"}
                                        <span className="icon-star"></span>
                                    </div>
                                </div>
                                <Link to={`/workshops/${w.Id}`}><h4
                                    className="workshop-card-title">{w.WorkshopTitle ? w.WorkshopTitle : "---"}</h4>
                                </Link>
                                <div className="d-flex flex-wrap align-items-center gap-2 my-3">
                                    <span
                                        className="hashtag">{w.workshopsubjectcategory ? w.workshopsubjectcategory : "---"}</span>
                                </div>
                                <p className="workshop-card-price text-end"><span>
                                    {w.workshopprice ? w.workshopprice : "---"}

                                </span> ریال </p>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <Link to={`/workshops/${w.Id}`} className="AZ-primary-btn"> ثبت نام </Link>
                                    <p className="number-participants d-flex align-items-center gap-1"> {w.Contributers ? w.Contributers : "---"}
                                        <span className="icon-group"></span></p>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default WorkshopsPage;