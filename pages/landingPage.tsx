import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
const LandingPage: React.FC = () => {
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
                <title>landing</title>
            </Head>
            
            <Script
                src="/js/libraries/jquery-3.6.0.js"
                strategy="beforeInteractive"
            />
            <Script
                src="/js/libraries/bootstrap.bundle.min.js"
                strategy="lazyOnload"
            />
            {/*<Script*/}
            {/*    src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"*/}
            {/*    strategy="lazyOnload"*/}
            {/*/>*/}
            <Script src="/js/global.js" strategy="lazyOnload" />
        </>
    )
}

export default LandingPage
