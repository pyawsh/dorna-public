import {useEffect, useState} from "react";
import axios from "axios";
import coinIcon from "../../../assets/img/coin-motion.gif";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import {Button, DialogContent, DialogTitle, Input, Modal, ModalDialog, Stack} from "@mui/joy";

const UserCredit = () => {
    const [tabs, setTabs] = useState(1);
    const [transactions, setTransactions] = useState();
    const [coins, setCoins] = useState();
    const [prices, setPrices] = useState();
    const [open, setOpen] = useState();
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const handleChangeTab = (t) => () => {
        setTabs(prev => t);
    };

    const getDornaCoins = async () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserDornaWithToken&apikey=${process.env.REACT_APP_API_KEY}&token=${token}`)
            .then(function (response) {
                setCoins(() => response.data[0]);
            });
    };


    const getTransactions = async () => {
        if (!id) return;
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserTransaction&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setTransactions(() => response.data);
            });
    };

    const getDornaPrices = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetDornaPrices&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setPrices(() => response.data);
            });
    };

    const handleGetData = async () => {
        await getTransactions();
        await getDornaCoins();
    };

    useEffect(() => {
        handleGetData();
        return () => {
            setTransactions([]);
            setPrices([]);
            setCoins([]);
        };
    }, []);


    const handleOpenChargeModal = () => {
        setOpen(() => true);
        getDornaPrices();
    };

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3">
                        <h2 class="page-header-title text-center d-flex align-items-center gap-1">
                            <img src={coinIcon} alt="" style={{width:'2em', height:'2em'}}/>
                            {coins?.dorna ? coins?.dorna : "0"} 
                            درنا کوین
                            </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="d-flex align-items-center justify-content-end my-4">
                        <div onClick={handleOpenChargeModal} class="increase-credit-btn d-flex align-items-center gap-1"
                             data-bs-toggle="offcanvas" data-bs-target="#increaseCreditBottom"
                             aria-controls="offcanvasBottom">
                            <span class="icon-plus1"></span>
                            افزایش اعتبار
                        </div>
                    </div>
                    <div class="AZ-tabs-wrapper d-flex align-items-center justify-content-center gap-3 mb-4">
                        <ul class="tabs p-0 d-inline-flex align-items-center  justify-content-start w-md-100">
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(1)}
                                     class="tab-link active d-flex align-items-center justify-content-center flex-column"> دریافت
                                    شده
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(2)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column">استفاده
                                    شده
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(3)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column"> خریداری
                                    شده
                                </div>
                            </li>
                            <li class="d-flex align-items-center justify-content-center flex-column">
                                <div onClick={handleChangeTab(4)}
                                     class="tab-link d-flex align-items-center justify-content-center flex-column"> پیشنهادات
                                    ویژه
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tabContainer">

                        {tabs === 1 && <div id="tab1" class="tabContent">
                            <table class="table-wrapper">
                                <thead>
                                <tr>
                                    <th> امتیاز</th>
                                    <th>جزییات</th>
                                    <th> تاریخ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions?.map((t, i) => {
                                    return <tr key={i}>
                                        <td data-label="امتیاز" className="score">+{t.dornadealvalue}</td>
                                        <td data-label="جزییات">{t.trasactiontype}</td>
                                        <td data-label="تاریخ">{t.datedeal}</td>
                                    </tr>;
                                })}
                                </tbody>
                            </table>
                        </div>}

                        {tabs === 2 && <div id="tab2" class="tabContent">

                        </div>}

                        {tabs === 3 && <div id="tab3" class="tabContent">

                        </div>}

                        {tabs === 4 && <div id="tab4" class="tabContent">
                            <p>کوین با
                                قیمت کمتر در اختیار کاربران برای خرید قرار می گیرد</p>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>افزایش اعتبار</DialogTitle>
                <DialogContent>
                    <div className={"d-flex justify-content-between"}>
                        <div>درنا کوین فعلی:</div>
                        <div>{coins?.dorna ? coins?.dorna : "0"}</div>
                    </div>
                </DialogContent>
                <div className={"d-flex flex-column gap-2"}>
                    {prices?.map((p, i) => {
                        return <Button key={i}
                                       onClick={() => setOpen(false)}
                                       className={"w-100 d-flex justify-content-between"}>
                            <p>{p.dornacoincount} درنا کوین</p>
                            <p>{p.rialdorna} تومان</p>
                        </Button>;
                    })}
                </div>
                <Input placeholder={"مبلغ های دیگر"}></Input>
                <div>
                    <Stack spacing={2}>
                        <Button  onClick={() => setOpen(false)} type="submit">پرداخت</Button>
                    </Stack>
                </div>
            </ModalDialog>
        </Modal>
    </section>;
};
export default UserCredit;