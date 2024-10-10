import React, { useEffect, useState } from "react";

function BridgePage() {
  const [showModal, setShowModal] = useState(false);
//   const [showSafariMessage, setShowSafariMessage] = useState(false);

  useEffect(() => {
    document.title = "패션&스타일";
    handlePageLoad();
  }, []);

  const handlePageLoad = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const targetUrl = window.location.href;

    // 인앱 브라우저 감지 정규식 패턴
    const inAppBrowserPattern = /kakaotalk|line|inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsapp|electron|wadiz|aliapp|zumapp|whale|kakaostory|band|twitter|daumapps|daumdevice\/mobile|fb_iab|fb4a|fban|fbios|fbss|trill|samsungbrowser\/[^1]/i;

    if (userAgent.match(/kakaotalk/i)) {
      // 카카오톡 외부 브라우저로 열기
      window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(targetUrl);
    } else if (userAgent.match(/line/i)) {
      // 라인 외부 브라우저로 열기
      if (targetUrl.indexOf('?') !== -1) {
        window.location.href = targetUrl + '&openExternalBrowser=1';
      } else {
        window.location.href = targetUrl + '?openExternalBrowser=1';
      }
    } else if (userAgent.match(inAppBrowserPattern)) {
      // 기타 인앱 브라우저 처리
      if (/iphone|ipad|ipod/i.test(userAgent)) {
        // iOS의 경우 Safari로 열도록 안내 메시지 표시
        // setShowSafariMessage(true);
        // window.location.href = 'x-web-search://?';
        window.location.href = 'fashionandstyle://?';
        setTimeout(() => {
            setShowModal(true); // 딥링크 실패 시 모달 표시
            window.location.href.replace("https://www.fashionandstyle.com");
        }, 2000);
      } else {
        // Android의 경우 Chrome으로 열기
        window.location.href = 'intent://' + targetUrl.replace(/https?:\/\//i, '') + '#Intent;scheme=http;package=com.android.chrome;end';
      }
    } else if (/android/i.test(userAgent)) {
      // 일반 Android 사용자 딥링크 시도
      window.location.href = 'fashionandstyle://';
      setTimeout(() => {
        setShowModal(true); // 딥링크 실패 시 모달 표시
      }, 2000);
    } else if (/iphone|ipad|ipod/.test(userAgent) && !window.MSStream) {
      // 일반 iOS 사용자 딥링크 시도
      window.location.href = 'fashionandstyle://';
      setTimeout(() => {
        setShowModal(true); // 딥링크 실패 시 모달 표시
      }, 2000);
    } else {
      // 그 외의 경우 처리
      window.location.href = "https://www.fashionandstyle.com";
    }
  };

  const handleStoreRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.fas.android";
    } else if (/iphone|ipad|ipod/i.test(userAgent) && !window.MSStream) {
      window.location.href = "https://apps.apple.com/app/id1620312420";
    }
  };

  // Safari로 리다이렉트하는 함수
//   const redirectToSafari = () => {
//     copyToClipboard(window.location.href);
//     alert('URL 주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여넣기 및 이동"을 누르면 정상적으로 이용하실 수 있습니다.');
//     window.location.href = 'x-web-search://?';
//   };

//   // 클립보드에 텍스트를 복사하는 함수
//   const copyToClipboard = (text) => {
//     const textarea = document.createElement("textarea");
//     textarea.value = text;
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand('copy');
//     document.body.removeChild(textarea);
//   };

  return (
    <>
       <div>
            <h1>브릿지 페이지 입니다.</h1>
            <p>잠시 후 앱으로 이동합니다. 이동되지 않으면 앱 스토어에서 설치해주세요.</p>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2>앱 열기 실패</h2>
                  <p>앱을 여는 데 실패했습니다. 앱스토어로 이동하여 앱을 설치하거나 다시 시도하세요.</p>
                  <button onClick={handleStoreRedirect}>앱스토어로 이동</button>
                  <button onClick={handlePageLoad}>다시 시도</button>
                </div>
              </div>
            )}
            <div>
              <a id="moveToAPP" href="fashionandstyle://">앱에서 열기</a>
              <p>또는</p>
              <a href="https://apps.apple.com/app/id1620312420">앱스토어에서 설치</a>
            </div>
          </div>
    </>
  );
}

export default BridgePage;
