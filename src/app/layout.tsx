import React from 'react';
import HeadContent from './HeadContent';
import ClientSideWrapper from '../lib/ClientSideWrapper'; // 클라이언트 컴포넌트 분리

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <HeadContent />
      <body>
        {/* 클라이언트 컴포넌트로 동적 상태 및 API 호출 위임 */}
        <ClientSideWrapper>
          {children}
        </ClientSideWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
