import createElement from "./createElement.js";
import render from "./render.js";
import mount from "./mount.js";

export default function async(dataList, childrenDataList) {
  // 받아온 데이터의 자식들을 가상돔 형식으로 배열에 담는다.
  for (let i = 0; i < dataList.results.length; i++) {
    const newChild = createElement("div", {
      attrs: {
        id: dataList.results[i].id,
        class: "content_v_item",
      },
      children: [
        createElement("img", {
          attrs: {
            src: `https://image.tmdb.org/t/p/original/${dataList.results[i].poster_path}`,
            class: "content_v_item_img",
          },
        }),
        createElement("div", {
          attrs: {
            class: "title",
          },
          children: [dataList.results[i].title],
        }),
        createElement("div", {
          attrs: {
            class: "span",
          },
          // children: [`⭐️ ${dataList.results[i].vote_average.toFixed(1)} 👍 ${dataList.results[i].vote_count}`],
          children: [
            createElement("span", {
              attrs: {
                class: "span_rating",
              },
              children: [`⭐️ ${dataList.results[i].vote_average.toFixed(1)}`],
            }),
            createElement("span", {
              attrs: {
                class: "span_vote",
              },
              children: [`👍 ${dataList.results[i].vote_count}`],
            }),
          ],
        }),
      ],
    });
    childrenDataList.push(newChild);
  }

  // 마지막으로 app으로 감싸서 돔으로 만든 뒤에 교체해준다.
  const createVApp = () => {
    return createElement("div", {
      attrs: {
        id: "app",
        class: "content_v_container",
      },
      children: childrenDataList,
    });
  };

  let vApp = createVApp();
  return vApp;
}
