import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getImage } from "../../utils/images";

const DiseaseId = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [key, setKey] = useState("");
    const [initial, setInitial] = useState(false);

    const handleGetDiseaseList = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetOtcCasesByDiesase&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                if (response.data) {
                    setList(() => response.data);
                }
            });
    };

    useEffect(() => {
        handleGetDiseaseList();
        return () => {
            setList([]);
        };
    }, []);


    const handleSearch = async (value) => {
        if (!initial) return;
        // {{host_url}}api/doapi?func=SearchOtcDiesesandcase&OtcDiseaseName=id&Onvan=hhh&apikey={{apiKey}}
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchSelectCase&id=${id}&Onvan=% ${value}%&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setList(() => response?.data);
            });
    };

    useEffect(() => {
        setList([]);
        const handler = setTimeout(() => {
            if (key.trim().length > 0) {
                handleSearch(key);
            }
            else {
                handleGetDiseaseList();
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
        if (key.trim().length > 0) {
            setKey("");
        }
        else{
            navigate(-1);
        }
    };


    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        {/*<h2 class="page-header-title text-center">  بیماری‌های گوارشی </h2>*/} {/*todo => api*/}
                        <HandlePreviousPageButton overrideMethod={goBack}/>
                    </div>
                    <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." value={key} onChange={(e) => handleSearchOnDiseases(e)} />
                    </div>
                    {key.trim().length > 0 &&
                        <h6 className="my-2" style={{fontFamily:"IRANSans-Bold"}}>
                            نتایج جستجو برای {key}
                        </h6>
                    }
                    <div class="">
                        {list?.map((l, i) => {
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
                </div>
            </div>
        </div>
        <BottomNavigation />
    </section>;

};
export default DiseaseId;