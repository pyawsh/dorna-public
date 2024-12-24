import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const BottomNavigation = () => {
    const [activeIndex, setActiveIndex] = useState(() => {
        const active = localStorage.getItem("bottom_link");
        return active ? parseInt(active, 10) : 3;
    });

    const sliderRef = useRef(null);
    const linksRef = useRef([]);

    useEffect(() => {
        const updateSliderPosition = () => {
            if (sliderRef.current && linksRef.current[activeIndex]) {
                const position = linksRef.current[activeIndex].getBoundingClientRect();
                const margin = 35;
                sliderRef.current.style.left = `${position.left + margin}px`;
            }
        };

        updateSliderPosition();
    }, [activeIndex]);

    const handleClick = (index) => {
        localStorage.setItem("bottom_link", index);
        setActiveIndex(index);
    };

    return (
        <div className="bottom-navber px-3">
            <div className="slider" ref={sliderRef}></div>
            <ul className="d-flex align-items-start justify-content-evenly">
                {["/thread", "/notification", "/home", "/profile", "/prescription"].map((path, index) => (
                    <li key={index}>
                        <Link
                            to={path}
                            ref={el => linksRef.current[index] = el}
                            onClick={() => handleClick(index)}
                            className={`sc-menu-item AZ-img-container d-flex align-items-center justify-content-center ${activeIndex === index ? "active" : ""}`}
                        >
                            <div className="AZ-img-container-inner">
                                <span
                                    className={`icon-${index === 0 ? "mail" : index === 1 ? "bell" : index === 2 ? "home" : index === 3 ? "account2" : "medical-bottle-svgrepo-com"}`}></span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BottomNavigation;
