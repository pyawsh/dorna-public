import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";
import BottomNavigation from "../../../components/share/BottomNavigation";
import {useEffect, useState} from "react";
import axios from "axios";

const UserWorkshops = () => {
    const [workshops, setWorkshops] = useState();
    const id = localStorage.getItem("user_id");

    const getWorkshops = () => {
        if (!id) return;
        axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserWorkshop&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`)
            .then(function (response) {
                setWorkshops(() => response.data);
            });
    };

    useEffect(() => {
        getWorkshops();
        return () => {
            setWorkshops([]);
        };
    }, []);

    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> ورکشاپ‌ها </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..."/>
                    </div>
                    <div>
                        {workshops?.map((w, i) => {
                            return <div key={i} className="AZ-workshop-card mb-3">
                                <div>
                                    <p className="workshop-card-title">{w.UserWorkshopTitle}</p>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default UserWorkshops;