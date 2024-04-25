import render from "./render.js";
import editDiffChildren from "./diffChildren.js";

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

// children은 배열로 들어온다.
// 에러 : Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
const diffChildren = (oldVChildren, newVChildren) => {
  return editDiffChildren(oldVChildren, newVChildren);
  // const childPatches = [];
  // const additionalPatches = [];

  // // 기존 것만큼만 돈다. 기존것과 새로운 것 비교.

  // oldVChildren.forEach((oldVChild, i) => {
  //   childPatches.push(diff(oldVChild, newVChildren[i]));
  // });

  // // 배열 메서드 slice, (시작, 끝 인덱스 미포함) 얕은 복사로 새로운 배열을 생성하여 준다. 인수가 하나면 시작 인덱스부터 끝까지
  // // 위에서는 비교를 위해 과거 인덱스 수도 돌리고 새 인덱스가 길다면 이후 새 인덱스 안돌린 것부터 시작!
  // for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
  //   additionalPatches.push(($node) => {
  //     $node.appendChild(render(additionalVChild));
  //     return $node;
  //   });
  // }

  // return ($parent) => {
  //   for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
  //     patch($child);
  //   }

  //   for (const patch of additionalPatches) {
  //     patch($parent);
  //   }
  //   return $parent;
  // };
};

// Diffing Algorithm
const diff = (oldVTree, newVTree) => {
  // undefined 일 때
  if (newVTree === undefined) {
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  // 둘중의 하나가 스트링
  if (typeof oldVTree === "string" || typeof newVTree === "string") {
    // 하나만 스트링 => 굳이 비교할 것 없이 그냥 바로 새로 생성하기
    if (oldVTree !== newVTree) {
      return ($node) => {
        const $newNode = render(newVTree);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      // 둘다 스트링임.
      return ($node) => $node;
    }
  }

  // 둘다 스트링 아님. 완전 다른 태그라면?
  if (oldVTree.tagName !== newVTree.tagName) {
    return ($node) => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  // 다른 태그가 아닌거야! => 비교 시작!!!
  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  // children이 undifined인 경우 방지용!
  if (newVTree.children) {
    const patchChildren = diffChildren(oldVTree.children, newVTree.children);

    return ($node) => {
      patchAttrs($node);
      patchChildren($node);
      return $node;
    };
  }

  return ($node) => {
    patchAttrs($node);
    return $node;
  };
};

export default diff;
