import React, { useEffect } from "react";

function BridgePage() {
  useEffect(() => {
    document.title = "패션&스타일";
  }, []);

  useEffect(() => {
    // DOMContentLoaded 이벤트가 이미 발생했는지 확인
    if (document.readyState === "complete") {
      // 페이지가 이미 로드된 상태라면 직접 실행
      handlePageLoad();
    } else {
      // 페이지가 로드되지 않았다면 load 이벤트 리스너를 등록
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      // 이벤트 리스너 클린업
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);

  const handlePageLoad = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // Android 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = "https://www.fashionandstyle.com";
      document.body.appendChild(iframe);
      setTimeout(() => {
        window.location = "https://play.google.com/store/apps/details?id=com.fas.android";
      }, 2000);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      alert(1);
      window.location.href = "fashionandstyle://";
      alert(2);
      const link = document.getElementById("moveToAPP");
      alert(link.href);
      link.click();
    //   window.open("https://www.fashionandstyle.com", "_self");
      alert(3);
      window.location.replace("https://www.fashionandstyle.com");
      document.body.appendChild(iframe);
      setTimeout(() => {
        window.location.href = "https://apps.apple.com/app/id1620312420";
      }, 2000);
    }
  };

  return (
    <>
      <div>
        <h1>브릿지 페이지 입니다.</h1>
        <p>잠시 후 앱으로 이동합니다. 이동되지 않으면 앱 스토어에서 설치해주세요.</p>
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
