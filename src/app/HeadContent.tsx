'use client';

import React from 'react';
import Script from 'next/script';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() || {};
const GA_MEASUREMENT_ID = publicRuntimeConfig?.GA_MEASUREMENT_ID || '';

const HeadContent = () => {
  return (
    <head>
      <title>Hack Playground - CTF 사이트</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="keywords" content="CTF, 해킹, 보안, 문제 풀이" />
      <meta name="description" content="CTF 사이트 테스트용 페이지" />
      <link rel="icon" href="/images/test_sione.jpeg" type="image/gif" />
      <link rel="stylesheet" href="/styles/bootstrap.css" />
      <link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/styles/font-awesome.min.css" />
      <link rel="stylesheet" href="/styles/style.css" />
      <link rel="stylesheet" href="/styles/responsive.css" />
      <link rel="stylesheet" href="/styles/navbar-hover.css" />

      <style>{`
        .nav-link {
          position: relative;
          display: inline-block;
          text-decoration: none;
          color: inherit;
          padding-bottom: 5px;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .nav-link:hover {
          color: #007bff;
          transform: scale(1.1);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: #007bff;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>

      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </head>
  );
};

export default HeadContent;
