import diff from "./diff.js";

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

export default function editDiffChildren(oldVChildren, newVChildren) {
  const childPatches = [];
  const additionalPatches = [];

  // oldVChildren의 children의 존재 여부
  // 1. 존재
  if (oldVChildren) {
    oldVChildren.forEach((oldVChild, i) => {
      childPatches.push(diff(oldVChild, newVChildren[i]));
    });

    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
      additionalPatches.push(($node) => {
        $node.appendChild(render(additionalVChild));
        return $node;
      });
    }

    return ($parent) => {
      for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
        patch($child);
      }

      for (const patch of additionalPatches) {
        patch($parent);
      }
      return $parent;
    };
  }
  // 2. 없음
  newVChildren.forEach((newVChildren) => {
    additionalPatches.push(($node) => {
      $node.appendChild(render(newVChildren));
      return $node;
    });
  });

  return ($parent) => {
    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
}
