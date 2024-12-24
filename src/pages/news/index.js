import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LoadingComponent from "../../components/share/Loading";

const News = () => {
    const [news, setNews] = useState();
    const [key, setKey] = useState();
    const [initial, setInitial] = useState(false);

    const getNews = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTazeha&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setNews(() => response.data);
            });
    };

    useEffect(() => {
        getNews();
        return () => {
            setNews([]);
        };
    }, []);

    const handleSearch = async (value) => {
        if (!initial) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchPagefour&contenttitle=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setNews(() => response?.data);
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

    if(!news)  return <LoadingComponent/>;


    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> تازه‌های‌علم‌جهان </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearchOnThreads(e)}/>
                    </div>
                    <div class="AZ-tabs-wrapper d-flex align-items-center justify-content-center gap-3 mb-4">
                        <ul class="tabs p-0 d-inline-flex align-items-center  justify-content-start w-md-100">
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <a href="#tab1"
                                   class="tab-link active d-flex align-items-center justify-content-center flex-column"> همه </a>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <a href="#tab2"
                                   class="tab-link d-flex align-items-center justify-content-center flex-column"> پزشکی </a>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <a href="#tab3"
                                   class="tab-link d-flex align-items-center justify-content-center flex-column"> داروسازی </a>
                            </li>
                        </ul>
                    </div>
                    <div class="tabContainer">
                        {news?.map((n, i) => {
                            return <div id="tab1" className="tabContent">
                                <div>
                                    <div className="AZ-post-card-horizontal">
                                        {n.CoverImage && <Link to={`/news/${n.Id}`} className="post-horizontal-img AZ-img-container">
                                            <div className="AZ-img-container-inner AZ-img-cover">
                                                <img src={`${process.env.REACT_APP_FILEMANAGER}${n.CoverImage}`}
                                                     alt=""/>
                                            </div>
                                        </Link>}
                                        <div className="flex-grow-1">
                                            <Link to={`/news/${n.Id}`}><p
                                                className="post-horizontal-title">{n.contenttitle}</p></Link>
                                            <div
                                                className="d-flex align-items-center justify-content-between gap-2 mt-4">
                                                <Link to={`/news/${n.Id}`}
                                                      className="read-more-btn d-flex align-items-center gap-1"> بیشتر
                                                    بخوانید <span className="icon-arrow-left2"></span></Link>
                                                <p className="post-card-date">{n.datecontentcreated}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                        })}

                        <div id="tab2" class="tabContent">

                        </div>

                        <div id="tab3" class="tabContent">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};

export default News;