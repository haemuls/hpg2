// google-signin.js

window.onload = function () {
  google.accounts.id.initialize({
    client_id: 'YOUR_GOOGLE_CLIENT_ID', // 여기 'YOUR_GOOGLE_CLIENT_ID'를 실제 클라이언트 ID로 교체
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.querySelector('.gsi-material-button'), // 버튼 렌더링할 요소 선택
    { theme: 'outline', size: 'large' } // 버튼 스타일 설정
  );
};

function handleCredentialResponse(response) {
  console.log('Encoded JWT ID token: ' + response.credential);
  // 인증 후 동작 처리
}