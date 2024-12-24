import {Link, useParams} from "react-router-dom";
import BottomNavigation from "../../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import axios from "axios";
import {useEffect, useState} from "react";

const ExamWithTagId = () => {
    const [tags, setTag] = useState();
    const [key, setKey] = useState();
    const [initial, setInitial] = useState(false);
    const {id} = useParams();

    const getExamDetail = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllAzmoonWithTagId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setTag(() => response.data);
            });
    };

    useEffect(() => {
        getExamDetail();
        return () => {
            setTag([]);
        };
    }, []);

    const handleSearch = async (value) => {
        if (!initial) return;
        // {{host_url}}api/doapi?func=searchpagetwenty&AzmoonTagid=id&azmoontitle=hhh&apikey={{apiKey}}

        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=searchpagetwenty&AzmoonTagid=${id}&azmoontitle=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setTag(() => response?.data);
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


    const handleSearchOnDiseases = e => {
        setInitial(true);
        const value = e.target.value;
        setKey(() => value);
    };

    console.log(tags);

    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center">{tags?.length > 0 ? tags[0].tag : "---"}</h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div className="AZ-search-wrapper">
                        <button type="button"><span className="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearchOnDiseases(e)}/>
                    </div>
                    <div>
                        {tags?.map((t, i) => {
                            return <Link key={i} to={`/exam/tag/review/${t.Id}`}
                                         className="AZ-faq-box d-flex align-items-center justify-content-between gap-3 ">
                                {t.AzmoonTitle && <h4 className="faq-box-title">{t.AzmoonTitle}</h4>}
                                {t.azmoontitle	 && <h4 className="faq-box-title">{t.azmoontitle}</h4>}
                                <div className="d-flex align-items-center gap-2">
                                    <p className="faq-number"> {t.Soalcount} سوال </p>
                                    <span className="icon-keyboard_arrow_left"></span>
                                </div>
                            </Link>;
                        })}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default ExamWithTagId;