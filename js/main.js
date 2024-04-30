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
