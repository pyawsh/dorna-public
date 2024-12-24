import React, { useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, login } from 'redux/action'
import * as process from 'process'

const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        dispatch(
            login({
                query: {
                    filters: {
                        func: 'Login',
                        apikey: process.env.NEXT_PUBLIC_ROOT_API_KEY,
                        username,
                        password,
                    },
                },
            }) as any
        ).then((res: any) => {
            console.log(res.payload)
        })
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
                            <form onSubmit={handleSubmit}>
                                <h1 className="login-info-title text-center">
                                    ورود
                                </h1>
                                <div className="AZ-field-group">
                                    <label htmlFor="username">نام کاربری</label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="نام کاربری"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="AZ-field-group">
                                    <label htmlFor="password">رمزعبور</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="رمزعبور"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
