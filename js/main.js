// import createElement from "./vdom/createElement.js";
import vdom from "./vdom/vdom.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";
import diff from "./vdom/diff.js";

import { getData, urlAddress } from "./data/data.js";

(async () => {
  // 먼저 데이터를 받아온다.
  const dataList = await getData(urlAddress.popular);
  const childrenDataList = [];

  // 받아온 데이터의 자식들을 가상돔 형식으로 배열에 담는다.
  // for (let i = 0; i < dataList.results.length; i++) {
  //   const newChild = createElement("div", {
  //     attrs: {
  //       id: dataList.results[i].id,
  //       class: "content_v_item",
  //     },
  //     children: [
  //       createElement("img", {
  //         attrs: {
  //           src: `https://image.tmdb.org/t/p/original/${dataList.results[i].poster_path}`,
  //           class: "content_v_item_img",
  //         },
  //       }),
  //       createElement("div", {
  //         attrs: {
  //           class: "title",
  //         },
  //         children: [dataList.results[i].title],
  //       }),
  //       createElement("div", {
  //         attrs: {
  //           class: "span",
  //         },
  //         // children: [`⭐️ ${dataList.results[i].vote_average.toFixed(1)} 👍 ${dataList.results[i].vote_count}`],
  //         children: [
  //           createElement("span", {
  //             attrs: {
  //               class: "span_rating",
  //             },
  //             children: [`⭐️ ${dataList.results[i].vote_average.toFixed(1)}`],
  //           }),
  //           createElement("span", {
  //             attrs: {
  //               class: "span_vote",
  //             },
  //             children: [`👍 ${dataList.results[i].vote_count}`],
  //           }),
  //         ],
  //       }),
  //     ],
  //   });
  //   childrenDataList.push(newChild);
  // }

  // // 마지막으로 app으로 감싸서 돔으로 만든 뒤에 교체해준다.
  // const createVApp = () => {
  //   return createElement("div", {
  //     attrs: {
  //       id: "app",
  //       class: "content_v_container",
  //     },
  //     children: childrenDataList,
  //   });
  // };
  let vApp = await vdom(dataList, childrenDataList);
  const $app = render(vApp);
  let $rootEl = mount($app, document.getElementById("app"));

  document.getElementById("app").addEventListener("click", (event) => {
    if (event.target.getAttribute("class") === "content_v_item") {
      alert(event.target.id);
    } else {
      if (
        event.target.parentElement.getAttribute("class") === "content_v_item"
      ) {
        alert(event.target.parentElement.id);
      } else {
        const parent = event.target.parentElement;
        alert(parent.parentElement.id);
      }
    }
  });

  document
    .getElementById("controller")
    .addEventListener("click", async (event) => {
      const currentId = document.getElementById("controller").dataset.current;
      let response;
      let vNewApp;
      let patch;
      const childrenDataList = [];
      switch (event.target.id) {
        case "playing":
          response = await getData(urlAddress.playing);
          console.log(response);
          vNewApp = await vdom(response, childrenDataList);
          patch = diff(vApp, vNewApp);
          $rootEl = patch($rootEl);
          vApp = vNewApp;

          event.target.className = "hover controller_selected";
          document.getElementById(currentId).className = "hover";
          document
            .getElementById("controller")
            .setAttribute("data-current", "playing");
          break;
        case "popular":
          response = await getData(urlAddress.popular);
          vNewApp = await vdom(response, childrenDataList);
          patch = diff(vApp, vNewApp);
          $rootEl = patch($rootEl);
          vApp = vNewApp;

          event.target.className = "hover controller_selected";
          document.getElementById(currentId).className = "hover";
          document
            .getElementById("controller")
            .setAttribute("data-current", "popular");
          break;
        case "top":
          response = await getData(urlAddress.top);
          vNewApp = await vdom(response, childrenDataList);
          patch = diff(vApp, vNewApp);
          $rootEl = patch($rootEl);
          vApp = vNewApp;

          event.target.className = "hover controller_selected";
          document.getElementById(currentId).className = "hover";
          document
            .getElementById("controller")
            .setAttribute("data-current", "top");
          break;
        case "upcoming":
          response = await getData(urlAddress.upcoming);
          vNewApp = await vdom(response, childrenDataList);
          patch = diff(vApp, vNewApp);
          $rootEl = patch($rootEl);
          vApp = vNewApp;

          event.target.className = "hover controller_selected";
          document.getElementById(currentId).className = "hover";
          document
            .getElementById("controller")
            .setAttribute("data-current", "upcoming");
          break;
      }
    });
})();

// const createVApp = (count) =>
//   createElement("div", {
//     attrs: {
//       id: "app",
//       key: `${Math.random()}`,
//       dataCount: count,
//       class: "content_v_container",
//     },
//     children: [
//       "The current count is: ",
//       String(count),
//       createElement("img", {
//         attrs: {
//           src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
//           key: `${Math.random()}`,
//         },
//       }),
//     ],
//   });

// let vApp = createVApp(0);
// const $app = render(vApp);
// let $rootEl = mount($app, document.getElementById("app"));

// const dataList = getData(urlAddress.popular);
// const singleImage = getImage(dataList.results, 500);

// setInterval(() => {
//   const n = Math.floor(Math.random() * 10);
//   const vNewApp = createVApp(n);
//   const patch = diff(vApp, vNewApp);

//   // we might replace the whole $rootEl,
//   // so we want the patch will return the new $rootEl
//   $rootEl = patch($rootEl);

//   vApp = vNewApp;
// }, 1000);
