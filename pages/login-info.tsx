import React, { useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'

const LoginPage: React.FC = () => {
    const [profileImage, setProfileImage] = useState('/img/3177440.png')

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" type="image/x-icon" href="/img/logo.png" />
                <title>login - info</title>
            </Head>
            <section className="AZ-login-page AZ-page-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form action="">
                                <h1 className="login-info-title text-center">
                                    حساب کاربری
                                </h1>
                                <p className="login-text text-center">
                                    برای ورود به برنامه اطلاعات کاربری خود را
                                    وارد کنید.
                                </p>
                                <div className="upload_image d-flex align-items-center flex-column mb-5">
                                    <div className="position-relative">
                                        <div className="preview-profile-img AZ-img-container">
                                            <div className="AZ-img-container-inner AZ-img-cover">
                                                <Image
                                                    id="imgPreview"
                                                    src={profileImage}
                                                    alt="Profile Preview"
                                                    className="preview1"
                                                    width={150}
                                                    height={150}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="upload-profile-wrapper">
                                        <label
                                            htmlFor="uploadProfile"
                                            className="d-flex align-items-center"
                                        >
                                            <span className="icon-camera"></span>
                                        </label>
                                        <input
                                            type="file"
                                            id="uploadProfile"
                                            title=""
                                            className="input-img"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                </div>
                                <div className="AZ-field-group">
                                    <label htmlFor="fullName">
                                        نام و نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        placeholder="نام و نام خانوادگی"
                                    />
                                </div>
                                <div className="AZ-field-group">
                                    <label htmlFor="email">ایمیل</label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder="ایمیل"
                                    />
                                </div>
                                <div className="AZ-field-group">
                                    <label htmlFor="referralCode">
                                        کد معرف (اختیاری)
                                    </label>
                                    <input
                                        type="text"
                                        id="referralCode"
                                        placeholder="کد معرف"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="AZ-primary-btn w-100"
                                >
                                    ورود به برنامه
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Script src="/js/global.js" strategy="lazyOnload" />
            <Script src="/js/upload-img.js" strategy="lazyOnload" />
        </>
    )
}

export default LoginPage
