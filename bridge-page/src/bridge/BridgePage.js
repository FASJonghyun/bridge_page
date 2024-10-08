import React, {useEffect} from "react";

function BridgePage() {

    useEffect(() => {
        document.title = "패션&스타일";
    }, []);

    // useEffect(() => {
    //     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    //     if (/android/i.test(userAgent)) {
    //       // Android 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
    //       window.location = "fashionandstyle://";
    //       setTimeout(() => {
    //         window.location = "https://play.google.com/store/apps/details?id=com.fas.android";
    //         setTimeout(() => {
    //             window.close();
    //         }, 500);
    //       }, 2000);
    //     } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    //       // iOS 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
    //       window.location = "fashionandstyle://";
    //       setTimeout(() => {
    //         window.location = "https://apps.apple.com/app/id1620312420";
    //         setTimeout(() => {
    //             window.close();
    //         }, 500);
    //       }, 2000);
    //     }
    //   }, []);

    const handleLinkClick = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            // Android 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
            window.location = "fashionandstyle://";
            setTimeout(() => {
                window.location = "https://play.google.com/store/apps/details?id=com.fas.android";
            }, 2000);
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // iOS 사용자일 경우 딥링크를 시도하고, 앱 스토어로 리다이렉트
            window.location = "fashionandstyle://";
            setTimeout(() => {
                window.location = "https://apps.apple.com/app/id1620312420";
            }, 2000);
        }
    };

    return(
        <>
            <div>
                <h1>
                    브릿지 페이지 입니디.
                </h1>
                <p>잠시 후 앱으로 이동합니다. 이동되지 않으면 앱 스토어에서 설치해주세요.</p>
   
                <button onClick={handleLinkClick}>
                    앱 스토어로 이동하기
                </button>
            </div>
        </>
    );
}

export default BridgePage;



