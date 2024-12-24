import userInformation from "../../assets/img/user-info.png";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";

const UserProfile = () => {
    return <section class="AZ-page-container AZ-panel">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3">
                        <h2 class="page-header-title text-center d-flex align-items-center gap-1">نمایش اطلاعات
                            کاربری</h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <div>
                        <div class="d-flex align-items-center gap-4 my-4">
                            <div class="profile-img AZ-img-container">
                                <div class="AZ-img-container-inner AZ-img-cover">
                                    <img src={userInformation} alt=""/>
                                </div>
                            </div>
                            <div>
                                <h4 class="username AZ-section-title mb-1"> غلام غلامی </h4>
                                <span class="expertise"> داروساز </span>
                            </div>
                        </div>
                        <h2 class="AZ-section-title"> خلاصه </h2>
                        <div class="AZ-box mb-4">
                            <p class="box-text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                                از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                                است </p>
                        </div>

                        <h2 class="AZ-section-title"> مهارت‌ها </h2>
                        <div class="d-flex align-items-center flex-warp gap-2 mb-4">
                            <p class="skill-tag"> نظم </p>
                            <p class="skill-tag"> نظم </p>
                            <p class="skill-tag"> نظم </p>
                            <p class="skill-tag"> نظم </p>
                            <p class="skill-tag"> نظم </p>
                        </div>

                        <h2 class="AZ-section-title"> پروژه‌ها </h2>
                        <div class="AZ-box mb-4">
                            <ul class="box-list">
                                <li> لورم ایپسوم متن ساختگی با تولید سادگی</li>
                                <li> نامفهوم از صنعت چاپ</li>
                                <li> استفاده از طراحان گرافیک چاپگرها</li>
                                <li> متون بلکه روزنامه و مجله در ستون و سطر</li>
                            </ul>
                        </div>

                        <h2 class="AZ-section-title"> ورکشاپ‌ها </h2>
                        <div class="AZ-box mb-4">
                            <ul class="box-list">
                                <li> لورم ایپسوم متن ساختگی با تولید سادگی</li>
                                <li> نامفهوم از صنعت چاپ</li>
                                <li> استفاده از طراحان گرافیک چاپگرها</li>
                                <li> متون بلکه روزنامه و مجله در ستون و سطر</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
};
export default UserProfile;