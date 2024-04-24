// 만든 html, 부모 hmtl
export default ($node, $target) => {
  $target.replaceWith($node);
  return $node;
};
