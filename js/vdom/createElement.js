// "가상 요소"를 반환
export default (tagName, { attrs, children }) => {
  // 프로토타입을 상속받지 않는 순수 오브젝트를 생성하게 만들어 준다!
  const vElem = Object.create(null);

  Object.assign(vElem, {
    tagName,
    attrs,
    children,
  });

  return vElem;
};
