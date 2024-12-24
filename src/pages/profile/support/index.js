import {useEffect, useState} from "react";
import {DialogContent, DialogTitle, Modal, ModalDialog} from "@mui/joy";
import supportIcon from "../../../assets/img/support.png";
import axios from "axios";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import userInformation from "../../../assets/img/user-info.png";

const UserSupport = () => {
    const [open, setOpen] = useState();
    const [contacts, setContacts] = useState();
    const [messages, setMessages] = useState();
    const [msg, setMsg] = useState();
    const [user, setUser] = useState();

    const id = localStorage.getItem("user_id");

    const getAllSupportContacts = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllContactsInfo&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setContacts(() => response.data);
            });
    };

    const getAllUserMessages = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetSupportListOfuserWithId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setMessages(() => response.data);
            });
    };

    const handleGetUserInformation = async () => {
        if (!id) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=UserInfo&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setUser(() => response.data[0]);
            });
    };

    const handleSendMessage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (typeof msg === "string" && msg.length === 0) {
            // alert("متن ارسال شده خالی میباشد!");
            return;
        }
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=UploadSupportRequestFromAppUser&Supporttext=${msg}&apikey=${process.env.REACT_APP_API_KEY}&pccid=${id}&userid=${id}`)
            .then(function (response) {
                // alert("پیام شما با موفیت ارسال شد");
            });
        getAllUserMessages();
        setMsg(() => "");
    };

    const handleGetData = async () => {
        await getAllUserMessages();
        await handleGetUserInformation();
    };

    useEffect(() => {
        handleGetData();
        return () => {
            setContacts([]);
            setUser([]);
            setMessages([]);
        };
    }, []);

    const handleOpenModal = () => {
        setOpen(true);
        getAllSupportContacts();
    };


    const handleChangeUserMessage = (e) => {
        setMsg(() => e.target.value);
    };

    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="message-box">
                        <div
                            className="chat__conversation-header d-flex align-items-center justify-content-between gap-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="chat-profile AZ-img-container">
                                    <div className="AZ-img-container-inner AZ-img-cover">
                                        <img
                                            src={user?.Uploadphoto ? `${process.env.REACT_APP_FILEMANAGER}${user?.Uploadphoto}` : userInformation}
                                            alt=""/>
                                    </div>
                                </div>
                                <h4 className="chat-username">{user?.fullname}</h4>
                            </div>
                            <div className="d-flex align-items-center gap-5">
                                <div onClick={handleOpenModal} className="support-btn" data-bs-toggle="offcanvas"
                                     data-bs-target="#supportBottom" aria-controls="offcanvasBottom"><span
                                    className="icon-info"></span></div>
                                <a href="#" className="back-btn position-relative"><HandlePreviousPageButton/></a>
                            </div>
                        </div>

                        <div className="chat__conversation-board">
                            {messages?.map((m) => {
                                return <>
                                    <div className="chat__conversation-board__message-container ">
                                        <div className="chat__conversation-board__message__context d-flex flex-column">
                                            <span className="chat__text">{m.Supporttext}</span>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="icon-double-tick-svgrepo-com"></span>
                                                <span className="time_masage"> 09:34 </span>
                                            </div>
                                        </div>
                                    </div>
                                    {m.requestanswer &&
                                        <div className="chat__conversation-board__message-container reversed">
                                            <div
                                                className="chat__conversation-board__message__context d-flex flex-column">
                                                <span className="chat__text">{m.requestanswer}</span>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="time_masage"> 09:34 </span>
                                                </div>
                                            </div>
                                        </div>}
                                </>;
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
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>به کمک بیشتری نیاز داری؟ برامون پیام بذار یا از راه های پایین باهامون تماس
                    بگیر</DialogTitle>
                <DialogContent>
                    <img src={supportIcon} alt="" width="100%"/>
                </DialogContent>
                <div className="offcanvas-body small d-flex align-items-center justify-content-center flex-column">
                    <ul className="support-contact my-4">
                        {contacts?.map((c, i) => {
                            return <li className="d-flex align-items-center gap-3 py-1">
                                <img src={`${process.env.REACT_APP_FILEMANAGER}${c.Icon}`} alt=""/>
                                <div>{c.Link}</div>
                            </li>;
                        })}
                    </ul>
                </div>
            </ModalDialog>
        </Modal>
    </section>;
};
export default UserSupport;