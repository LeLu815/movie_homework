window.addEventListener("scroll", function () {
  const nav = document.getElementById("top_nav");
  const content = document.getElementById("nav_container");
  const contentRect = content.getBoundingClientRect();

  console.log(nav);

  if (contentRect.top < window.innerHeight && contentRect.bottom > 0) {
    // content가 화면 안에 있을 때
    nav.style.visibility = "hidden"; // nav를 화면 상단에 고정
    nav.style.zIndex = "-1";
  } else {
    // content가 화면 밖으로 나갔을 때
    nav.style.visibility = "visible"; // nav를 화면 위로 사라지게 함
    nav.style.zIndex = "10";
  }
});
