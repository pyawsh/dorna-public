import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../components/share/BottomNavigation";
import { Button, Modal, Option, Select, Sheet, Typography } from "@mui/joy";

const PrescriptionId = () => {
    const [list, setList] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const { id } = useParams();
    const [open, setOpen] = useState();
    const [filterTitle, setFilterTitle] = useState();
    const [initial, setInitial] = useState();
    const [key, setKey] = useState("");
    const [drugSelect, setDrugSelect] = useState({
        1: undefined,
        2: undefined
    });
    const [diseaseName, setDiseaseName] = useState('');
    const [search] = useSearchParams();

    const getAllDiseaseNames = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetPresbydiesetwo&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                if (response.data.length > 0) {
                    setList(() => response.data);
                    if (response.data[0].DiseseName) {
                        setDiseaseName(response.data[0].DiseseName);
                    }
                    else {
                        if (search.get("diseaseName")) {
                            setDiseaseName(search.get("diseaseName"));
                        }
                    }
                    setFilterTitle(() => response.data[0].DiseseName);
                }
                else {
                    if (search.get("diseaseName")) {
                        setDiseaseName(search.get("diseaseName"));
                    }
                }
            });
    };

    useEffect(() => {
        getAllDiseaseNames();
        return () => {
            setList([]);
            setDrugs([]);
        };
    }, []);

    const handleGetDrugs = () => {
        if (initial) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllDrugNames&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setDrugs(() => response.data);
                setInitial(true);
            });
    };

    function handleOpenModal() {
        setOpen(() => true);
        handleGetDrugs();
    }

    const handleSetDrugName = (scope, id) => {
        setDrugSelect(prev => {
            return {
                ...prev,
                [scope]: id
            };
        });
    };

    const handleSearchOnDrugs = () => {
        if (drugSelect["1"] === undefined) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetPreccribtionByFilter&CatgeroyId=${id}&firstId=${drugSelect["1"]}&secondId=${drugSelect["2"] ? drugSelect["2"] : "0"}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setList(response.data);
                setOpen(() => false);
            });
    };


    function handleDeletFilter() {
        getAllDiseaseNames();
        setOpen(() => false);
    }

    const handleSearch = async (value) => {
        if (!initial) return;
        // await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=searchpagetwentyseven&DiseseName=${id}&Prescribtionsubject=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
        //     .then(function (response) {
        //         setList(() => response?.data);
        //     });
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetPreccribtionByFilter&id=${id}&Prescribtionsubject=% ${value}%&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setList(() => response?.data);
            });
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (key.trim().length > 0) {
                handleSearch(key);
            }
            else {
                getAllDiseaseNames();
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [key]);

    const handleSearchOnTech = e => {
        setInitial(true);
        const value = e.target.value;
        setKey(() => value);
    };


    return <>
        <section class="AZ-page-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                            <h2 className="page-header-title text-center">{diseaseName}</h2>
                            <HandlePreviousPageButton />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-4">
                            {/* <div onClick={handleOpenModal}
                                 className="filter-btn d-flex align-items-center justify-content-center"
                                 data-bs-toggle="offcanvas" data-bs-target="#filterBottom"
                                 aria-controls="offcanvasBottom"><span className="icon-filter1"></span></div> */}
                            <div className="AZ-search-wrapper mb-0">
                                <button type="button"><span className="icon-search"></span></button>
                                <input type="search" placeholder="جستجوی عنوان نسخه ..." onChange={(e) => handleSearchOnTech(e)} />
                            </div>
                        </div>
                        <div className="">
                            {list?.map((d, i) => {
                                return <a href={`/prescription/file/${d.Id}?diseaseName=${diseaseName}`}
                                    className="file-item d-flex align-items-center gap-3" key={d.Id}>
                                    {d.icon &&
                                        <div className="file-item-img d-flex align-items-center justify-content-center">
                                            <img src={`${process.env.REACT_APP_FILEMANAGER}${d.icon}`} alt="" />
                                        </div>}
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                                            <h4 className="file-item-name">{d.Prescribtionsubject ? d.Prescribtionsubject : (d.DiseseName ? d.DiseseName : "---")}</h4>
                                            <p className="file-item-date d-flex align-items-center gap-2">{d.presrank ? d.presrank : "---"}<span
                                                className="icon-star"></span></p>
                                        </div>
                                        {/* <p className="file-item-text">بیمار:
                                            {d.Sex ? d.Sex + "ی" : "---"}
                                            &nbsp;

                                            {d.PaitentAge ? d.PaitentAge + "ساله" : "---"}
                                            &nbsp;
                                            با تشخیص
                                            &nbsp;
                                            {d.Prescribtionsubject ? d.Prescribtionsubject : "---"}
                                        </p> */}
                                    </div>
                                </a>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg",
                    }}
                >
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >فیلترها</Typography>
                    <div className="w-100">
                        <div className="AZ-field-group">
                            <label htmlFor=""> دسته‌بندی </label>
                            <input type="text" placeholder="موضوع" value={filterTitle} />
                        </div>
                        <Select placeholder="دارو اول">
                            {drugs?.map((d, i) => {
                                return <Option key={i} onClick={() => handleSetDrugName(1, d.Id)}
                                    value={d.Id}>{d.DrugName}</Option>;
                            })}
                        </Select>
                        <Select placeholder="دارو دوم" className={"mt-3"}>
                            {drugs?.map((d, i) => {
                                return <Option key={i} onClick={() => handleSetDrugName(2, d.Id)}
                                    value={d.Id}>{d.DrugName}</Option>;
                            })}
                        </Select>
                    </div>
                    <div className={"d-flex gap-2 mt-5"}>
                        <Button onClick={handleSearchOnDrugs}>اعمال</Button>
                        <Button variant={"outlined"} color={"neutral"} onClick={handleDeletFilter}>پاک کردن</Button>
                    </div>
                </Sheet>
            </Modal>
        </section>
    </>;
};
export default PrescriptionId;