import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/share/Loading";
import { getImage } from "../../utils/images";

const OtcPage = () => {
    const navigate = useNavigate();
    const [disease, setDisease] = useState();
    const [key, setKey] = useState("");
    const [initial, setInitial] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const getDiseases = () => {
        setSearchResults([]);
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetOtcDisease&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setDisease(() => response.data);
            });
    };

    useEffect(() => {
        getDiseases();
        return () => {
            setDisease([]);
        };
    }, []);

    const handleSearch = async (value) => {
        if (!initial) return;
        setSearchResults([]);
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchCaseOtp&Onvan=% ${value}%&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setSearchResults(() => response?.data);
            });
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (key.trim().length > 0) {
                handleSearch(key);
            }
            else {
                getDiseases();
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [key]);


    const handleSearchOnDiseases = e => {
        setInitial(true);
        const value = e.target.value;
        setKey(() => value);
    };

    const goBack = () => {
        if (searchResults.length > 0) {
            setKey("");
            setSearchResults([]);
        }
        else{
            navigate(-1);
        }
    };

    if (!disease) return <LoadingComponent />;


    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center"> تراپی OTC </h2>
                        <HandlePreviousPageButton overrideMethod={goBack}/>
                    </div>
                    <div className="AZ-search-wrapper">
                        <button type="button"><span className="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." value={key} onChange={(e) => handleSearchOnDiseases(e)} />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/disease/add" className="d-flex align-items-center justify-content-end mb-3">
                            <a href="#" className="AZ-primary-btn d-flex align-items-center gap-1"> <span
                                className="icon-plus2"></span> افزودن بیمار </a>
                        </Link>
                    </div>
                    <div className="row">
                        {searchResults.length > 0 ?
                            <div className="container">
                                {searchResults?.map((l, i) => {
                                    const fullstars = Number(l.StarsCount);
                                    // const Ostars = 10 - fullstars;
                                    return <Link key={i} to={`/disease/intro/${l.Id}`}
                                        class=" AZ-category-card d-flex align-items-center gap-3">
                                        {l.OtcPic && <div class="category-card-img AZ-img-container">
                                            <div class="AZ-img-container-inner AZ-img-cover">
                                                <img src={`${process.env.REACT_APP_FILEMANAGER}${getImage(l.OtcPic)}`} alt="" />
                                            </div>
                                        </div>}
                                        <div>
                                            <h4 class="category-card-title mb-3">{l.Onvan}</h4>
                                            {l.StarsCount && <div class="stars">
                                                {!!fullstars && [...Array(fullstars)].map(e => {
                                                    return <span className="icon-star"></span>;
                                                })}
                                                {/* {!!Ostars && [...Array(Ostars)].map(e => {
                                                    return <span className="icon-star-o"></span>;
                                                })} */}
                                            </div>}
                                        </div>
                                    </Link>;
                                })}

                            </div>
                            :
                            disease?.map((d, i) => {
                                return <div key={i} className="col-6 mb-4">
                                    <Link to={`/disease/${d.Id}`}
                                        className="AZ-version-category d-flex align-items-center gap-3 justify-content-center h-100 p-4 flex-column">
                                        <img src={`${process.env.REACT_APP_FILEMANAGER}${d.Icon}`} alt="" />
                                        <p className="version-category-text text-center">{d.DiseaseName}</p>
                                    </Link>
                                </div>;
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation />
    </section>;

};
export default OtcPage;