import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";

const vApp = createElement("div", {
  attrs: {
    id: "app",
  },
  children: [
    "Hello world", // 텍스트노드
    createElement("img", {
      attrs: {
        src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
      },
    }),
  ],
});

// const $app = render(vApp);
console.log(vApp);
