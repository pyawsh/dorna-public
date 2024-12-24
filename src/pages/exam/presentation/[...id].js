import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../../components/share/BottomNavigation";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {decodeHtml} from "../../projects/[...id]";

const PresentationId = () => {
    const [present, setPresent] = useState([]);
    const [dlLink, setDlLink] = useState([]);
    const {id} = useParams();

    const getAllDiseaseNames = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetPresentationwithbyid&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setPresent(() => response.data);
            });
    };

    const getDownloadLink = async () => {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getfilesofpresentationbyid&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                if (response.data.length < 1) return;
                const mData = response.data.filter(d => d.downloadpossibility === "1");
                setDlLink(() => mData);
            });
    };

    const handleGetDatas = async () => {
        await getAllDiseaseNames();
        await getDownloadLink();
    };


    useEffect(() => {
        handleGetDatas();
        return () => {
            setPresent([]);
        };
    }, []);

    const downloadFile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = dlLink[dlLink.length - 1]?.fileofcontent;
        const fileUrl = `${process.env.REACT_APP_FILEMANAGER}${url}`;
        let fileName = fileUrl.split("file=")[1];
        if (fileName.includes("&")) {
            fileName = fileName.split("&")[0];
        }
        const fileExtension = fileName.substring(fileName.lastIndexOf("."));

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `file${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return <section className="AZ-page-container AZ-file-page AZ-download-page">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <a href="#" className="download-btn"></a>
                        <div className="download-btn" onClick={downloadFile}>
                            <span className="icon-download1"></span>
                        </div>
                        <h2 className="page-header-title text-center"> {present.length > 0 ? present[0].contenttitle : "---"} </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    {present?.map((p, i) => {
                        return <div>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <p className="file-details">{p.professorname}</p>
                                <span className="file-details">{p.Date}</span>
                            </div>
                            <div className="AZ-section-text"
                                 dangerouslySetInnerHTML={{__html: decodeHtml(p.contentdiscription)}}/>
                        </div>;
                    })}
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default PresentationId;