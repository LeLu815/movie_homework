import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";
import diff from "./vdom/diff.js";

import { getData, getImage, urlAddress } from "./data/data.js";

const createVApp = (count) =>
  createElement("div", {
    attrs: {
      id: "app",
      key: `${Math.random()}`,
      dataCount: count,
    },
    children: [
      "The current count is: ",
      String(count),
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
          key: `${Math.random()}`,
        },
      }),
    ],
  });

let vApp = createVApp(0);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

(async () => {
  const dataList = await getData(urlAddress.popular);
  const singleImage = await getImage(dataList.results[0].poster_path, 500);
  console.log(singleImage);
})();

const dataList = getData(urlAddress.popular);
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
