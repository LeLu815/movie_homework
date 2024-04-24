const renderElem = ({ tagName, attrs, children }) => {
  // HTML 요소 생성
  const $el = document.createElement(tagName);

  // 어트리튜트 for문 돌면서 실제 요소에 setAttribute 메서드로 등록
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // 가상의 자식들도 실제 돔으로 요소까지 넣어주기
  if (children) {
    for (const child of children) {
      $el.appendChild(render(child));
    }
  }

  return $el;
};

const render = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

export default render;
