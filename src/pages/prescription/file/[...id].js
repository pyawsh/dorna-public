import { useParams, useSearchParams } from "react-router-dom";
// import fileRxIcon from "../../../assets/img/file-rx.png";
import fileRxIcon from "../../../assets/img/Rx.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import BottomNavigation from "../../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import { decodeHtml } from "../../projects/[...id]";

const FileId = () => {
    const [list, setList] = useState([]);
    const [tab, setTab] = useState(2);
    const [diseaseName, setDiseaseName] = useState("");
    const { id } = useParams();
    const [drugs, setDrugs] = useState([]);
    const [search] = useSearchParams();
    const getDrugs = async () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getprescriptionfordrug&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                if (response?.data?.length > 0) {
                    setDrugs(() => response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const getAllDiseaseNames = async () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetPrecribtionById&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                if (response?.data?.length > 0) {
                    let rawData = [...response.data];
                    setList(() => response.data?.splice(0, 1));
                    console.log(rawData);
                    
                    if (rawData[0].DiseseName) {
                        setDiseaseName(rawData[0].DiseseName);
                    }
                    else {
                        if (search.get("diseaseName")) {
                            setDiseaseName(search.get("diseaseName"));
                        }
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const loadPage = async () => {
        await getAllDiseaseNames();
        setTimeout(async () => {
            await getDrugs();
        }, 500);
    };
    useEffect(() => {
        loadPage();
    }, []);

    const handleSetTab = (t) => () => {
        setTab(prev => t);
    };

    return <>
        <section className="AZ-page-container AZ-file-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                            {/* <h1 className="page-header-title text-center" style={{ fontFamily: 'Nastaliq', fontSize: 'xx-large' }}>{list.length > 0 && list[0].DiseseName}</h1> */}
                            <h1 className="page-header-title text-center">{diseaseName}</h1>
                            <HandlePreviousPageButton />
                        </div>
                        <div className="row mb-3">
                            <div className="col-7 d-flex align-items-center ">
                                <h1 className="file-title" style={{ fontFamily: "Nastaliq", fontSize: 'x-large' }}>
                                    {/* بیمار:
                                    {list && list.length > 0 && list[0].Sex ? list[0].Sex + "ی" : "---"}
                                    &nbsp;

                                    {list && list.length > 0 && list[0].PaitentAge ? list[0].PaitentAge + "ساله" : "---"}
                                    &nbsp; */}
                                    تشخیص :
                                    &nbsp;
                                    {list && list.length > 0 && list[0].onvan ? list[0].onvan : "---"}
                                </h1>
                            </div>
                            <div className="col-auto ms-auto">
                                <img src={fileRxIcon} alt="" width="80" height="80" />
                            </div>
                        </div>
                        <ul className="file-list ltr">

                            {drugs?.map((f, i) => {
                                return <li key={i} className="file-details-text">
                                    <span> {(f.DrugName ?? '')}</span>
                                    <span> {f.Dose && f.Dose}</span>
                                    {/* <span> {f.Rout && f.Rout}</span>
                                    <div>
                                        <span> {f.frequency}</span>
                                    </div>
                                    <div>
                                        <span> {f.DrugStatus && f.DrugStatus}</span>
                                    </div> */}
                                </li>;
                            })}
                        </ul>
                        <div className="AZ-tabs-wrapper d-flex align-items-center gap-3 mb-4">
                            <ul className="tabs p-0 d-inline-flex align-items-center justify-content-start w-md-100">
                                {/* <li className={`d-flex align-items-center justify-content-center flex-column${tab === 1 ? ' active' : ''}`}>
                                    <span onClick={handleSetTab(1)}
                                        className="tab-link active d-flex align-items-center justify-content-center flex-column"> نسخه </span>
                                </li> */}
                                <li className={`d-flex align-items-center justify-content-center flex-column${tab === 2 ? ' active' : ''}`}>
                                    <span onClick={handleSetTab(2)}
                                        className="tab-link d-flex align-items-center justify-content-center flex-column"> نکات کلی </span>
                                </li>
                                <li className={`d-flex align-items-center justify-content-center flex-column${tab === 3 ? ' active' : ''}`}>
                                    <span onClick={handleSetTab(3)}
                                        className="tab-link d-flex align-items-center justify-content-center flex-column"> خطاهای دارویی </span>
                                </li>
                                <li className={`d-flex align-items-center justify-content-center flex-column${tab === 4 ? ' active' : ''}`}>
                                    <span onClick={handleSetTab(4)}
                                        className="tab-link d-flex align-items-center justify-content-center flex-column">نکات خاص و لینک های مفیدی</span>
                                </li>
                                {/* <li className={`d-flex align-items-center justify-content-center flex-column${tab === 5 ? ' active' : ''}`}>
                                    <span onClick={handleSetTab(5)}
                                        className="tab-link d-flex align-items-center justify-content-center flex-column">نکات خاص</span>
                                </li> */}
                            </ul>
                        </div>
                        <div className="tabContainer file-tabContainer">

                            {tab === 1 && <div id="tab1" className="tabContent">
                                <h2 className="file-details-title ltr">Prescription:</h2>
                                <ul className="file-list ltr">
                                    {list?.map((f, i) => {
                                        return <li key={i} className="file-details-text">
                                            <span> {(f.DrugName1 ?? '') + ' ' + (f.CommericialDrugName ?? '')}</span>
                                            <span> {f.Dose && f.Dose}</span>
                                            <span> {f.Rout && f.Rout}</span>
                                            <div>
                                                <span> {f.frequency}</span>
                                            </div>
                                            <div>
                                                <span> {f.DrugStatus && f.DrugStatus}</span>
                                            </div>
                                        </li>;
                                    })}
                                </ul>
                            </div>}

                            {tab === 2 && <div id="tab2" className="tabContent">
                                {list?.map((f, i) => {
                                    return <div key={i} className="AZ-box">
                                        <p className="box-text">{f.onvandistinguish}</p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.distinguish) }} />
                                    </div>;
                                })}
                            </div>}

                            {tab === 3 && <div id="tab3" className="tabContent">
                                {/* {list?.map((f, i) => {
                                    return <div key={i} className="AZ-box">
                                        <p className="box-text">{f.OnvanTosiehMasraf}</p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.TosiehMasraf) }} />
                                    </div>;
                                })} */}
                                {list?.map((f, i) => {
                                    return <div key={i} className="AZ-box">
                                        <p className="box-text"></p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.Consiquences) }} />
                                    </div>;
                                })}
                            </div>}

                            {tab === 4 && <div id="tab4" className="tabContent">
                                {list?.map((f, i) => {
                                    return <div key={i} className="AZ-box">
                                        <p className="box-text"></p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.TosiehMasraf) }} />
                                        <p className="box-text"></p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.Negahmatn) }} />
                                    </div>;
                                })}
                            </div>}

                            {tab === 5 && <div id="tab5" className="tabContent">
                                {list?.map((f, i) => {
                                    return <div key={i} className="AZ-box">
                                        <p className="box-text">{f.onvannokatkhas}</p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.nokatkhas) }} />
                                    </div>;
                                })}
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </section >
    </>;
};
export default FileId;