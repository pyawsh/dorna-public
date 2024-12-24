import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import userInformation from "../../assets/img/user-info.png";
import {decodeHtml} from "../projects/[...id]";

const NewsById = () => {
    const [news, setNews] = useState();
    const [comments, setComments] = useState();
    const {id} = useParams();
    const [userComment, setUserComment] = useState();
    const user_id = localStorage.getItem("user_id");

    const getNews = async () => {
        if (!id) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTazehaById&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setNews(() => response.data[0]);
            });
    };

    const getComments = async () => {
        if (!id) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTazehaCommentsById&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setComments(() => response.data);
            });
    };

    const handleGetData = async () => {
        await getComments();
        await getNews();
    };

    useEffect(() => {
        handleGetData();
        return () => {
            setComments([]);
            setNews([]);
        };
    }, []);


    const handleUserComment = () => (e) => {
        const value = e.target.value;
        setUserComment(prev => value);
    };

    const handleSendComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=UploalTazehacomments&Tazehacommentername=${user_id}&Tazehacommentdescription=${userComment}&apikey=${process.env.REACT_APP_API_KEY}&&pccid=${id}&userid=${user_id}`)
            .then(function () {
                setUserComment("");
                // alert("دیدگاه شما با موفقیت ارسال شد.");
                getComments();
            });
    };

    return <section class="AZ-page-container AZ-post-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-between position-relative py-3 mb-4">
                        <a href="#" class="share-btn"><span class="icon-share"></span> </a>
                        <HandlePreviousPageButton/>
                    </div>
                </div>
                <div class="col-lg-12">
                    <form action="">
                        <article>
                            <h1 class="post-title mb-4">{news?.contenttitle}</h1>
                            <div class="d-flex align-items-center gap-4 flex-wrap">
                                <p class="post-details">{news?.Writer} </p>
                                <p class="post-details">زمان حدودی مطالعه:
                                    {news?.Estimatetimeforreading ? news.Estimatetimeforreading : "---"}
                                    دقیقه </p>
                            </div>
                            <img src={`${process.env.REACT_APP_FILEMANAGER}${news?.CoverImage}`} alt=""/>

                            <div className="AZ-section-text mb-3"
                                 dangerouslySetInnerHTML={{__html: decodeHtml(news?.descriptioncontent)}}/>
                        </article>
                        <div class="line"></div>
                        {Array.isArray(comments) && comments?.map((c, i) => {
                            return <div className="comment-box active">
                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <div className="comment-profile AZ-img-container">
                                            <div className="AZ-img-container-inner AZ-img-cover">
                                                <img src={userInformation} alt=""/>
                                            </div>
                                        </div>
                                        <h4 className="comment-name">{c?.FullName}</h4>
                                        <span className="comment-date"> 10 ساعت پیش </span>
                                    </div>
                                    {/*<a href="#" className="like-btn "><span className="icon-heart-outline"></span></a>*/}
                                </div>
                                <p className="comment-text">{c?.Tazehacommentdescription}</p>
                            </div>;
                        })}
                        <div class="mt-5">
                            <div class="AZ-field-group">
                                <label for=""> دیدگاه خود را بیان کنید... </label>
                                <textarea name="" id="" cols="30" rows="4" placeholder="دیدگاه خود را بیان کنید..."
                                          value={userComment}
                                          onChange={handleUserComment()}
                                ></textarea>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="AZ-primary-btn" onClick={handleSendComment}> ارسال دیدگاه
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;

};
export default NewsById;