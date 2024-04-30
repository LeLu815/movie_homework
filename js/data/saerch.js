// function fetchSearchResults(query) {
//   // 가상의 검색 결과를 Promise로 반환
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(
//         ["결과1", "결과2", "결과3"].filter((item) => item.includes(query))
//       );
//     }, 1000);
//   });
// }

import { searchData } from "./data.js";
import vdom from "../vdom/vdom.js";
import render from "../vdom/render.js";
import mount from "../vdom/mount.js";

async function fetchSearchResults(url) {
  const data = await searchData(url);
  return data;
}

// URL에서 검색어 추출
const queryParams = new URLSearchParams(window.location.search);
const query = queryParams.get("query");

if (query) {
  (async () => {
    const dataList = await fetchSearchResults(query);
    const childrenDataList = [];

    const resultsLength = dataList.results.length;
    document.getElementById("search_count_span").innerText = resultsLength;

    let vApp = await vdom(dataList, childrenDataList);
    const $app = render(vApp);
    let $rootEl = mount($app, document.getElementById("app"));

    document.getElementById("app").addEventListener("click", (event) => {
      if (event.target.className === "content_v_item") {
        alert(event.target.id);
      } else {
        if (event.target.parentElement.className === "content_v_item") {
          alert(event.target.parentElement.id);
        } else {
          const parent = event.target.parentElement;
          if (parent.parentElement.className === "content_v_item") {
            alert(parent.parentElement.id);
          }
        }
      }
    });
  })();
}

function submitForm() {
  const searchQuery = document.getElementById("searchQuery").value;
  console.log(searchQuery);
  window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
  document.getElementById("searchQuery").value = "";
}

document.getElementById("searchForm").onsubmit = function (e) {
  e.preventDefault();
  submitForm();
};

document.getElementById("search_icon").addEventListener("click", submitForm);
