import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function BridgePage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "패션&스타일";
    handlePageLoad();
  }, []);

  const handlePageLoad = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const targetUrl = window.location.href;

    // 인앱 브라우저 감지 정규식 패턴
    const inAppBrowserPattern = /kakaotalk|line|inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsapp|electron|wadiz|aliapp|zumapp|whale|kakaostory|band|twitter|daumapps|daumdevice\/mobile|fb_iab|fb4a|fban|fbios|fbss|trill|samsungbrowser\/[^1]/i;


    const externalUrl = 'https://www.fashionandstyle.com';
    // const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.match(/kakaotalk/i)) {
      // 카카오톡 외부 브라우저로 열기
    //   window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(targetUrl);
        window.location.href = 'fashionandstyle://' + externalUrl.replace(/^https?:\/\//i, '');
    } else if (userAgent.match(/line/i)) {
      // 라인 외부 브라우저로 열기
      if (targetUrl.indexOf('?') !== -1) {
        // window.location.href = targetUrl + '&openExternalBrowser=1';
        window.location.href = 'fashionandstyle://' + externalUrl.replace(/^https?:\/\//i, '');
      } else {
        // window.location.href = targetUrl + '?openExternalBrowser=1';
        window.location.href = 'fashionandstyle://' + externalUrl.replace(/^https?:\/\//i, '');
      }
    } else if (document.referrer.includes('instagram.com')){
        // const externalUrl = 'https://www.fashionandstyle.com';
        // const userAgent = navigator.userAgent.toLowerCase();

        if (/android/i.test(userAgent)) {
        // Android 용 인텐트 스킴 (Chrome)
        window.location.href = 'intent://' + externalUrl.replace(/^https?:\/\//i, '') + '#Intent;scheme=https;package=com.android.chrome;end';
        } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        // iOS 용 커스텀 URL 스킴
        window.location.href = 'fashionandstyle://' + externalUrl.replace(/^https?:\/\//i, '');
        // window.location.href = externalUrl;
        } else {
        // 일반적인 리디렉션 시도
        window.location.href = externalUrl;
        }

        // 리디렉션 실패 시 사용자에게 안내 메시지 표시
        setTimeout(() => {
        setShowModal(true);
        window.location.replace(externalUrl);
        }, 2000);
    } else if (userAgent.match(inAppBrowserPattern)) {
      // 기타 인앱 브라우저 처리
      if (/iphone|ipad|ipod/i.test(userAgent)) {
        // iOS의 경우 유니버설 링크로 이동
        window.location.href = 'https://www.fashionandstyle.com/';
        setTimeout(() => {
          setShowModal(true); // 유니버설 링크 실패 시 모달 표시
          window.location.replace("https://www.fashionandstyle.com");
        }, 2000);
      } else {
        // Android의 경우 Chrome으로 열기
        window.location.href = 'intent://' + targetUrl.replace(/https?:\/\//i, '') + '#Intent;scheme=https;package=com.android.chrome;end';
      }
    } else if (/android/i.test(userAgent)) {
      // 일반 Android 사용자 유니버설 링크 시도
      window.location.href = 'https://www.fashionandstyle.com/';
      setTimeout(() => {
        setShowModal(true); // 유니버설 링크 실패 시 모달 표시
      }, 2000);
    } else if (/iphone|ipad|ipod/.test(userAgent) && !window.MSStream) {
      // 일반 iOS 사용자 유니버설 링크 시도
      window.location.href = 'https://www.fashionandstyle.com/';
      setTimeout(() => {
        setShowModal(true); // 유니버설 링크 실패 시 모달 표시
      }, 2000);
    } else {
      // 그 외의 경우 처리
    //   window.location.href = "https://www.fashionandstyle.com";
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

  return (
    <>
      <Helmet>
        <meta property="og:title" content="패션&스타일2" />
        <meta property="og:description" content="최신 패션과 스타일을 만나보세요." />
        <meta property="og:image" content="https://d1yzfoqf37d0dc.cloudfront.net/media/admin/post_images/2024/09/24/5c4d9419-b55e-42c8-8dcf-212a5187b163_20240924124908.jpg" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="테스트용"/>
      </Helmet>
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
          <a id="moveToAPP" href="https://www.fashionandstyle.com/">앱에서 열기</a>
          <p>또는</p>
          <a href="https://apps.apple.com/app/id1620312420">앱스토어에서 설치</a>
        </div>
      </div>
    </>
  );
}

export default BridgePage;
