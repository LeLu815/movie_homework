let count = 0;

// window.addEventListener("scroll", function () {
//   console.log(++count);
//   const nav = document.getElementById("top_nav");
//   const content = document.getElementById("nav_container");
//   const contentRect = content.getBoundingClientRect();

//   if (contentRect.top < window.innerHeight && contentRect.bottom > 0) {
//     // content가 화면 안에 있을 때
//     nav.style.visibility = "hidden"; // nav를 화면 상단에 고정
//     nav.style.zIndex = "-1";
//   } else {
//     // content가 화면 밖으로 나갔을 때
//     nav.style.visibility = "visible"; // nav를 화면 위로 사라지게 함
//     nav.style.zIndex = "10";
//   }
// });

let timer;
window.addEventListener(
  "scroll",
  // 이벤트 핸들러 함수
  function () {
    // 기존 타이머가 있다면 취소한다
    clearTimeout(timer);

    timer = setTimeout(function () {
      count++; // 디바운싱 카운트 증가
      const nav = document.getElementById("top_nav");
      const content = document.getElementById("nav_container");
      const contentRect = content.getBoundingClientRect();

      console.log(count);

      if (contentRect.bottom > 0) {
        // content가 화면 안에 있을 때
        nav.style.visibility = "hidden"; // nav를 화면 상단에 고정
        nav.style.zIndex = "-1";
      } else {
        // content가 화면 밖으로 나갔을 때
        nav.style.visibility = "visible"; // nav를 화면 위로 사라지게 함
        nav.style.zIndex = "10";
      }
    }, 50); // 500 밀리초 후에 실행될 로직
  }
);
