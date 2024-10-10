import React, { useEffect, useState } from "react";

function BridgePage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "패션&스타일";
    handlePageLoad();
  }, []);

  const handlePageLoad = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    // 인앱 브라우저 여부 확인 (페이스북, 인스타그램 등의 인앱 브라우저)
    if (userAgent.includes("FBAN") || userAgent.includes("FBAV") || userAgent.includes("Instagram")) {
      window.location.href = "https://www.fashionandstyle.com"; // 외부 브라우저로 이동
      return;
    }
  
    if (/android/i.test(userAgent)) {
      // Android 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = "fashionandstyle://";
      document.body.appendChild(iframe);
      setTimeout(() => {
        window.location = "https://play.google.com/store/apps/details?id=com.fas.android";
      }, 2000);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = "fashionandstyle://";
      document.body.appendChild(iframe);
      setTimeout(() => {
        window.location.href = "https://apps.apple.com/app/id1620312420";
      }, 2000);
    }
  };
  

  const handleStoreRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location = "https://play.google.com/store/apps/details?id=com.fas.android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location = "https://apps.apple.com/app/id1620312420";
    }
  };

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
          <a id="moveToAPP" href="https://www.fashionandstyle.com">앱에서 열기</a>
          <p>또는</p>
          <a href="https://apps.apple.com/app/id1620312420">앱스토어에서 설치</a>
        </div>
      </div>
    </>
  );
}

export default BridgePage;
