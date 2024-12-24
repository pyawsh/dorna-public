import React from 'react'
import 'swiper/css'

const Home: React.FC = () => {
    return (
        <section className="AZ-login-page AZ-page-container">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-lg-12 h-100">
                        <form
                            action=""
                            className="d-flex flex-column justify-content-between h-100"
                        >
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-center mb-4">
                                    <img src="/img/color-logo 2.png" alt="" />
                                </div>
                                <h1 className="login-title">
                                    ورود به درنا پلاس
                                </h1>
                                <div className="AZ-field-group">
                                    <label htmlFor="">
                                        {' '}
                                        کد 4 رقمی به شماره{' '}
                                        <span>09324897654</span> ارسال شده است.{' '}
                                    </label>
                                    <input type="text" placeholder="09" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="AZ-primary-btn w-100"
                            >
                                {' '}
                                ادامه{' '}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
