import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
const VerifyCodePage: React.FC = () => {
    useEffect(() => {
        let timeInSecs: number
        let ticker: NodeJS.Timeout

        const startTimer = (secs: number) => {
            timeInSecs = parseInt(secs.toString())
            ticker = setInterval(tick, 1000)
        }

        const tick = () => {
            let secs = timeInSecs
            if (secs > 0) {
                timeInSecs--
            }

            const mins = Math.floor(secs / 60)
            secs %= 60
            const pretty = `${mins < 10 ? '0' : ''}${mins}:${
                secs < 10 ? '0' : ''
            }${secs}`

            const countdownElement = document.getElementById('countdown')
            if (countdownElement) {
                countdownElement.innerHTML = pretty
            }
        }

        startTimer(2 * 60) // 2 minutes in seconds

        // Code for input handling
        const inputElements = Array.from(
            document.querySelectorAll('input.code-input')
        ) as HTMLInputElement[]

        inputElements.forEach((ele, index) => {
            ele.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && ele.value === '') {
                    inputElements[Math.max(0, index - 1)].focus()
                }
            })

            ele.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement
                const [first, ...rest] = target.value
                target.value = first ?? ''
                if (index !== inputElements.length - 1 && first !== undefined) {
                    inputElements[index + 1].focus()
                    inputElements[index + 1].value = rest.join('')
                    inputElements[index].classList.add('active')
                } else {
                    inputElements[index].classList.remove('active')
                }
            })
        })

        return () => {
            clearInterval(ticker)
        }
    }, [])

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
                <title>verify code</title>
            </Head>
            <section className="AZ-login-page AZ-page-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form action="">
                                <h1 className="login-title mb-3">
                                    کد تایید را وارد کنید.
                                </h1>
                                <div className="AZ-field-group">
                                    <label className="d-flex align-items-center gap-2">
                                        کد 4 رقمی به شماره{' '}
                                        <span>09324897654</span> ارسال شده است.
                                    </label>
                                    <fieldset className="number-code">
                                        <div className="d-flex">
                                            <input
                                                name="code"
                                                className="code-input"
                                                required
                                            />
                                            <input
                                                name="code"
                                                className="code-input"
                                                required
                                            />
                                            <input
                                                name="code"
                                                className="code-input"
                                                required
                                            />
                                            <input
                                                name="code"
                                                className="code-input"
                                                required
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                                <a href="#" className="change-number">
                                    ویرایش شماره؟
                                </a>
                                <button
                                    type="submit"
                                    className="AZ-primary-btn w-100 mt-4"
                                >
                                    ورود
                                </button>
                                <p className="get-code-again text-center my-3">
                                    دریافت دوباره کد ({' '}
                                    <span id="countdown">01:54</span> )
                                </p>
                                <p className="get-code-again text-center my-3">
                                    دریافت دوباره کد ( <a href="#">دریافت</a> )
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Script src="/js/global.js" strategy="lazyOnload" />
        </>
    )
}

export default VerifyCodePage
