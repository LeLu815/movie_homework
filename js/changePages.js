import initialRender from "./initialRender.js";

import { searchData } from "./data/data.js";
import vdom from "../js/vdom/vdom.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";

// 페이지 상태를 변경하는 함수
export async function changePage(state, title, url) {
  // history.pushState를 사용하여 상태를 추가하고 URL을 변경합니다.
  // 첫 번째 인자는 상태 객체(state)로, popstate 이벤트가 발생했을 때 이 객체가 이벤트 객체에 전달됩니다.
  // 두 번째 인자는 타이틀(title)로, 현재는 대부분의 브라우저에서 무시됩니다.
  // 세 번째 인자는 변경할 URL입니다.
  history.pushState(state, title, url);

  // 페이지 내용 변경을 위한 함수 호출
  await updateContent(state);
}

// 페이지 내용을 변경하는 함수
export async function updateContent(state) {
  if (state && state.page === "search") {
    // 검색 페이지일 경우
    document.querySelector(".ad_main").style.display = "none";
    document.querySelector(".content_nav").style.display = "none";

    document.querySelector(".search_result_count").style.display = "flex";

    // 인풋 초기화
    document.getElementById("searchQuery").value = "";
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query");

    if (query) {
      (async () => {
        const dataList = await searchData(query);
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
  } else {
    // 메인 페이지일 경우
    document.querySelector(".ad_main").style.display = "flex";
    document.querySelector(".content_nav").style.display = "flex";

    document.querySelector(".search_result_count").style.display = "none";

    await initialRender();
  }
}

// history.pushState를 사용하여 페이지 상태를 변경할 때 popstate 이벤트를 처리합니다.
// 사용자가 브라우저의 뒤로 가기나 앞으로 가기 버튼을 클릭할 때 발생합니다.
window.addEventListener("popstate", async function (event) {
  // event.state는 pushState에서 첫 번째 인자로 전달한 상태 객체입니다.
  // 이 상태를 사용하여 페이지 내용을 업데이트합니다.
  await updateContent(event.state);
});

// 페이지 변경 예시 실행
// 변경할 상태 객체, 페이지 타이틀(대부분의 브라우저에서 무시됨), 변경할 URL을 인자로 전달합니다.
// changePage({ color: "blue" }, "Blue Page", "/blue");
