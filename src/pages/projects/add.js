import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";

const ProjectAdd = () => {
    return <section className="AZ-page-container">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 className="page-header-title text-center"> سفارش پروژه </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <form action="">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="AZ-field-group">
                                    <label htmlFor=""> نام و نام خانوادگی </label>
                                    <input type="text" placeholder=" نام و نام خانوادگی "/>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="AZ-field-group">
                                    <label htmlFor=""> عنوان پروژه</label>
                                    <input type="text" placeholder=" عنوان پروژه"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="AZ-field-group">
                                    <label htmlFor=""> هزینه تقریبی</label>
                                    <input type="text" placeholder="  هزینه "/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="AZ-field-group">
                                    <label htmlFor=""> زمان تحویل</label>
                                    <input type="text" placeholder="تعداد روز"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="AZ-field-group">
                                    <label htmlFor=""> توضیحات پروژه</label>
                                    <textarea name="" id="" cols="30" rows="4" placeholder="توضیحات پروژه"></textarea>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="AZ-field-group">
                                    <label htmlFor=""> رسانه </label>

                                    <div className="file">
                                        <div
                                            className="file__input d-flex flex-column align-items-center justify-content-center"
                                            id="file__input">
                                            <span className="icon-add_photo_alternate"></span>
                                            <input className="file__input--file" id="customFile2" type="file"
                                                   multiple="multiple" name="files[]"/>
                                            <label className="file__input--label" htmlFor="customFile2"
                                                   data-text-btn="آپلود">رسانه مورد نظر را اپلود کنید</label>
                                        </div>
                                        <div className="preview my-2"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-4 justify-content-end">
                                <button type="button" className="AZ-secondary-btn cancel-form-btn"> لغو</button>
                                <button type="button" className="AZ-primary-btn save-form-btn"> ذخیره</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default ProjectAdd;