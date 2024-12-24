import {useEffect, useState} from "react";
import axios from "axios";
import LoadingComponent from "../../components/share/Loading";
import {useNavigate} from "react-router-dom";

const Thread = () => {
    const [messages, setMessages] = useState();
    const [msg, setMsg] = useState();
    const [initial, setInitial] = useState(false);
    const [key, setKey] = useState();
    const navigate = useNavigate();

    let time;
    let date;

    const id = localStorage.getItem("user_id");

    const getMessages = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllChatsforChatRoom&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setMessages(() => response.data);
            });
    };

    const handleGetData = async () => {
        await getMessages();
    };

    useEffect(() => {
        handleGetData();
        return () => {
            setMessages([]);
        };
    }, []);

    const handleSendMessage = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const currentDate = new Date();
        currentDate.toLocaleString("fa-IR");
        date = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        time = currentDate.toTimeString().slice(0, 5);

        if (typeof msg === "string" && msg.length === 0) {
            // alert("متن ارسال شده خالی میباشد!");
            return;
        }
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=UpdateChatroom&UserId=${id}&UserMessage=${msg}&MessageDate=${date}&MessageTime=${time}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                // alert("پیام شما با موفیت ارسال شد");
                setMsg(()=>"");
            });
        await getMessages();
    };

    const handleChangeUserMessage = (e) => {
        setMsg(() => e.target.value);
    };


    const handleSearchOnThreads = (value) => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchPagetwo&Message=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                const mData = response?.data;
                if (mData.length <= 0) return;
                setMessages(mData);
                // for (let i = 0; i < mData.length; i++) {
                //     const id = mData[i].Id;
                //     let element = document.getElementsByClassName(`chat__conversation-board__message-container ${id}`)[0];
                //     const ihtml = element.innerHTML;
                //     element.innerHTML = ihtml + "➡️"
                // }
            });
    };

    useEffect(() => {
        if (!initial) return;
        const handler = setTimeout(() => {
            handleSearchOnThreads(key);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [key]);

    const handleSearch = e => {
        setInitial(true);
        const value = e.target.value;
        // if (value === "") return;
        setKey(() => value);
    };

    if (!messages) return <LoadingComponent/>;

    const handleRouteBack = () => {
        navigate(-1);
    };

    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="message-box">
                        <div className="chat__conversation-header d-flex align-items-center overflow-hidden gap-3">
                            <div className="AZ-search-wrapper w-100 flex-grow-1 mb-0">
                                <button type="button">
                                    <span className="icon-search"></span>
                                </button>
                                <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearch(e)}/>
                            </div>
                            <div className=" flex-shrink-0" onClick={handleRouteBack}>
                                <span className="icon-arrow-left1"></span>
                            </div>
                        </div>

                        <div className="chat__conversation-board">
                            {messages?.map((m, i) => {
                                return <div key={i} className={`chat__conversation-board__message-container ${m.Id}`}>
                                    <div className="chat__conversation-board__message__context d-flex flex-column">
                                        <span className="time_masage">{m.fullname ? m.fullname : "---"}</span>
                                        <span className="chat__text">{m.UserMessage}</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="icon-double-tick-svgrepo-com"></span>
                                            <span className="time_masage">{m.MessageTime ? m.MessageTime : "---"}</span>
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </div>

                        <div className="chat__conversation-panel">
                            <div className="chat__conversation-panel__container">
                                <div className="chat__conversation-panel__inner d-flex align-items-center gap-3">
                                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                                        <button onClick={handleSendMessage} type="button"
                                                className="send-message-btn"><span
                                            className="icon-send"></span></button>

                                        <input className="chat__conversation-panel__input"
                                               placeholder="پیام خود را اینجابنویسید..."
                                               value={msg}
                                               onChange={(e) => handleChangeUserMessage(e)}/>
                                    </div>
                                    <div className="group">
                                        {/*<label htmlFor="file-input" className="upload-file-message"><span*/}
                                        {/*    className="icon-paperclip"></span></label>*/}
                                        {/*<input type="file" id="file-input" className="file-input__input"/>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
};
export default Thread;