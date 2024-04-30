import initialRender from "./initialRender.js";
import { changePage } from "./changePages.js";
import { scrollNavFunc } from "./scroll.js";

// 최초 랜더링하기
(async () => {
  await initialRender();
})();

// 스크롤 이벤트
scrollNavFunc("top_nav", "nav_container");

// 제출 이벤트 등록
document.getElementById("searchForm").onsubmit = function (e) {
  const searchQuery = document.getElementById("searchQuery").value;
  e.preventDefault();
  changePage({ page: "search" }, "search", `index.html?query=${searchQuery}`);
};

document.getElementById("search_icon").addEventListener("click", async () => {
  const searchQuery = document.getElementById("searchQuery").value;
  changePage({ page: "search" }, "search", `index.html?query=${searchQuery}`);
});

// 로고 클릭
document.getElementById("logo").addEventListener("click", async () => {
  changePage({ page: "main" }, "main", `index.html`);
});
