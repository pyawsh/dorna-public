import axios from "axios";
import { useEffect, useState } from "react";
import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";
import LoadingComponent from "../../components/share/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/joy";
import { MuiChipsInput } from "mui-chips-input";

const Prescription = () => {
    const navigate = useNavigate();
    const [names, setNames] = useState();

    useEffect(() => {
        localStorage.setItem('bottom_link', 4)
    }, []);

    const getAllDiseaseNames = () => {
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=FirstPrescribtionPage&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setNames(() => response.data);
            });
    };

    useEffect(() => {
        getAllDiseaseNames();
        return () => {
            setNames([]);
        };
    }, []);


    const [error, setError] = useState(null);
    const handleSearch = async (value) => {
        await axios.post(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=searchdrugs&drugname=${value}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                if (response.data.error === -1) {
                    // error occurred
                    setError(response?.data?.error_msg || 'خطایی رخ داد');
                    return;
                }
                // success operations
                setSearchResults(response.data);

                // setList(() => response?.data);
            }).catch(error => {

            });
    };

    const [searchValue, setSearchValue] = useState("");
    const [searchChips, setSearchChips] = useState([]);
    const updateSearchChips = (name, action = "add") => {
        if (action === "add") {
            if (searchChips.includes(name)) {
                return;
            }
            else {
                // multiple choices
                // setSearchChips(old => [...old, name]);

                // single choice
                setSearchChips([name]);
            }
        }
        else if (action === "delete") {
            setSearchChips(old => old.filter(item => item !== name));
        }
    };
//     func: Getallinformationuser
// apikey: 4a2e82f3d1ec790edfef25a0895e481fab5ddd8d
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTA2NzQsImlhdCI6MTczNDE4MDE4Nn0.pkrbMVMc8-TPgjEikpdnWfhznMHi7Oafql8x5G7IpQ4
// id: 50674
    useEffect(() => {
        // clear before research 
        setSearchResults([]);

        if (searchChips.length > 0) {
            let mapString = "";
            searchChips.map((item, index) => {
                mapString += "% " + item + "%";
                if (index + 1 !== searchChips.length) {
                    mapString += ' , ';
                }
                return item;
            });
            handleSearch(mapString);
        }
    }, [searchChips]);
    // useEffect(() => {
    // const handler = setTimeout(() => {
    //     if (!!searchValue.trim()) {
    //         handleSearch(searchValue);
    //     }
    //     else {
    //         setSearchResults([]);
    //     }
    // }, 1000);

    // return () => {
    //     clearTimeout(handler);
    // };
    // }, [searchValue]);

    const handleSearchChange = e => {
        const value = e.target.value;
        setSearchValue(() => value);
    };

    const [searchResults, setSearchResults] = useState([]);

    const submitSearch = () => {
        if (searchValue.trim().length === 0) return;
        updateSearchChips(searchValue, "add");
        setSearchValue("");
    };
    useEffect(() => {
        console.log(searchChips);
    }, [searchChips])

    const goBack = () => {
        if (searchChips.length > 0) {
            setSearchChips([]);
        }
        else {
            navigate(-1);
        }
    };

    return <>
        <section class="AZ-page-container">
            {!names ?
                <LoadingComponent />
                :
                <>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                                    <h2 class="page-header-title text-center"> نسخه ها و نسخه شناسی </h2>
                                    <HandlePreviousPageButton overrideMethod={goBack} />
                                </div>
                                {searchChips.length > 0 &&
                                    <h6 class="text-center mb-2" style={{fontFamily:"IRANSans-Bold"}}> نتیجه جستجوی دارو :  </h6>
                                }
                                <div class="AZ-search-wrapper">
                                    <button type="button" onClick={submitSearch}><span class="icon-search"></span></button>
                                    <input type="search" placeholder="جستجوی عنوان دارو ..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                                        onKeyUp={(e) => e.key === "Enter" && submitSearch()} id="search-drug" />
                                    {/* <MuiChipsInput value={searchValue} onChange={setSearchValue} placeholder="جستجوی عنوان دارو ..." /> */}
                                </div>
                                {(searchChips.length > 0)
                                    ?
                                    <>
                                        <div className="d-flex flex-wrap gap-1 justify-content-start" style={{ width: 'fit-content' }}>
                                            {searchChips.map(item =>
                                                <div className="p-1" style={{ display: 'flex', border: '1px solid #000', borderRadius: '10px', width: 'auto', alignItems: 'center', gap: '1em' }}>
                                                    <div>{item}</div>
                                                    <i className="icon-cross" style={{ cursor: 'pointer' }} onClick={() => updateSearchChips(item, "delete")} />
                                                </div>
                                            )}
                                        </div>
                                        <hr></hr>
                                        <>
                                            <div className="mt-1">
                                                {searchResults?.map((d, i) => {
                                                    return <a href={`/prescription/file/${d.Id}?diseaseName=${d.DiseseName}`}
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
                                                        </div>
                                                    </a>;
                                                })}
                                            </div>
                                        </>
                                    </>
                                    :
                                    <div class="row">
                                        {names?.map((n, i) => {
                                            return <div className="col-6 mb-4" key={n.Id}>
                                                <Link to={`/prescription/${n.Id}?diseaseName=${n.Diseasename}`}
                                                    className="AZ-version-category d-flex align-items-center gap-3 justify-content-center h-100 p-4">
                                                    <img src={`${process.env.REACT_APP_FILEMANAGER}${n.Icon}`} alt="" />
                                                    <p className="version-category-text">{n.Diseasename}</p>
                                                </Link>
                                            </div>;
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: 'center' }}
                        autoHideDuration={6000}
                        open={error !== null}
                        variant='outlined'
                        color='danger'
                        onClose={(event, reason) => {
                            if (reason === 'clickaway') {
                                return;
                            }
                            setError(null);
                        }}
                    >
                        {error}
                    </Snackbar>
                </>
            }
            <BottomNavigation />
        </section >
    </>
};

export default Prescription;