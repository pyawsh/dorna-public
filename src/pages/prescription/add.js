import BottomNavigation from "../../components/share/BottomNavigation";
import HandlePreviousPageButton from "../../components/share/HandlePreviousPageButton";

const AddPrescription = () => {
    return <section class="AZ-page-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                        <h2 class="page-header-title text-center"> افزودن نسخه </h2>
                        <HandlePreviousPageButton/>
                    </div>
                    <form action="">
                        <div class="row">
                            <div class="group-add-row">
                                <div class="form-exams-list" id="form-exams-list">
                                    <div class="row form-group">
                                        <div class="col-lg-12">
                                            <div class="AZ-field-group">
                                                <label for=""> نام دارو </label>
                                                <input type="text" placeholder="مدرس دوره"/>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="AZ-field-group">
                                                <label for=""> Frequency </label>
                                                <input type="text" placeholder=" عنوان دوره"/>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="AZ-field-group">
                                                <label for=""> دوز مصرفی </label>
                                                <div class="row">
                                                    <div class="col-9 d-flex ">
                                                        <input type="text" placeholder="  عنوان"/>
                                                    </div>
                                                    <div class="col-3 d-flex">
                                                        <input type="text" placeholder=" واحد "/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="AZ-field-group">
                                                <label for=""> تعداد کل دارو </label>
                                                <input type="text" placeholder="  تعداد کل دارو "/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-end">
                                    <button
                                        class="js-add--exam-row border-0 AZ-primary-btn d-flex align-items-center gap-1 my-3">
                                        <span class="icon-plus2"></span> افزودن دارو
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="AZ-field-group">
                                    <label for=""> تشخیص </label>
                                    <textarea name="" id="" cols="30" rows="4" placeholder="تشخیص "></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="AZ-field-group">
                                    <label for=""> تداخلات دارو با غذا </label>
                                    <textarea name="" id="" cols="30" rows="4"
                                              placeholder="تداخلات دارو با غذا "></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="AZ-field-group">
                                    <label for=""> تداخلات دارو با دارو </label>
                                    <textarea name="" id="" cols="30" rows="4"
                                              placeholder="تداخلات دارو با دارو"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="AZ-field-group">
                                    <label for=""> عوارض جانبی </label>
                                    <textarea name="" id="" cols="30" rows="4" placeholder="عوارض جانبی"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="AZ-field-group">
                                    <label for=""> شرایط نگهداری </label>
                                    <textarea name="" id="" cols="30" rows="4" placeholder=" شرایط نگهداری "></textarea>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 justify-content-end">
                                <button type="button" class="AZ-secondary-btn cancel-form-btn"> لغو</button>
                                <button type="button" class="AZ-primary-btn save-form-btn"> ذخیره</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </section>;
};
export default AddPrescription;