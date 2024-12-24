import userIcon from "../../../assets/img/user-invite-friend.png";
import HandlePreviousPageButton from "../../../components/share/HandlePreviousPageButton";

const UserInvite = () => {
    const user_id = localStorage.getItem("user_id");


    const handleCopyText = () => {
        var copyText = document.getElementById("link");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        // Alert the copied text
        // alert("Copied the text: " + copyText.value);
    };

    return <section className="AZ-page-container AZ-dashboard-page">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 py-3">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3">
                        <HandlePreviousPageButton/>
                    </div>
                    <h1 className="AZ-section-title">با دعوت از دوستان خود، درنا کوین رایگان بگیرید .</h1>
                    <p className="AZ-section-text"> لینک دعوت یا کد معرفی خود را برای دوستانتان ارسال کنید و تا از این
                        طریق هم شما و هم دوستانتان اعتبار رایگان هدیه بگیریر.</p>
                    <div className="d-flex align-items-center gap-2 my-4">
                        <img src={userIcon} alt="" width="100%"/>
                    </div>
                    <div className="share-link d-flex align-items-center justify-content-between my-4 gap-3">
                        <span className="copy-text">کد دعوت: </span>
                        <div id="copy" className="copy" onClick={handleCopyText}>
                            <span className="icon-content_copy" aria-hidden="true" data-copytarget="#link"></span>
                        </div>
                        <input id="link" className="link" value={user_id} readOnly/>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <a href="#"
                           className="AZ-primary-btn w-100 justify-content-center align-items-center d-flex"> دعوت از
                            دوستان </a>
                    </div>
                </div>
            </div>
        </div>
    </section>;
};
export default UserInvite;