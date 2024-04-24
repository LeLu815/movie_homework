import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";
import diff from "./vdom/diff.js";

const createVApp = (count) =>
  createElement("div", {
    attrs: {
      id: "app",
      dataCount: count, // we use the count here
    },
    children: [
      "The current count is: ",
      String(count), // and here
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
        },
      }),
    ],
  });

let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

// setInterval(() => {
//   const n = Math.floor(Math.random() * 10);
//   const vNewApp = createVApp(n);
//   const patch = diff(vApp, vNewApp);

//   // we might replace the whole $rootEl,
//   // so we want the patch will return the new $rootEl
//   $rootEl = patch($rootEl);

//   vApp = vNewApp;
// }, 1000);
