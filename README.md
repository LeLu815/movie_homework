## CGV 영화 화면 디자인을 카피하였음.

스파르타 코딩클럽 영화 api를 활용한 바닐라자바스크립트 웹 페이지 만들기 과제.

- url : https://lelu815.github.io/movie_homework/

## 블로그들을 참고하여 가상돔을 부분적으로 구현해보고자 시도함.

가상돔을 세션 스토리지에 저장하여 화면 새로고침시 정보가 날아가지 않게 만들었음.
리액트에서는 고유 id를 사용하여 diff 함수를 구현했지만, 위 코드는 아직 구현하지 못함.
자식 엘리먼트들을 단순하게 배열 안에서 인덱스로 비교하여 같지 않으면 재생성하는 코드.

### 빠른 시일 내에 고유 아이드를 사용하여 비교하는 코드 작성을 시도해보겠습니다.

## 해야할 일

- [x] 1. 상단 sticky nav바 구현
- [x] 2. 검색 구현
- [x] 3. 데이터 불러오기
- [x] 4. 클릭시 이벤트 캡처링으로 영화요소 하나 선택하기
- [x] 5. 클릭시 데이터 불러오기
- [x] 6. 불러온 데이터 가상돔으로 바꿔주기

## 데이터 순서

데이터 패칭
데이터를 받아서 가상돔 자료 구조로 만들어준다.
가상돔을 실제 돔으로 만들어서 랜더링한다.

## 튜터님 피드백

- [x] 검색시 평점과 좋아요 부분을 클릭했을 때는 alert 호출
- [x] 스크롤이벤트 디바운싱 적용
- [x] 자바스크립트 module 파일 설정은 main.js, 전체 코드실행흐름을 main.js에서 확인할수있게 허브역할
- [x] event.target.getAttribute("class") 보다 event.target.className 으로 DOM property에 접근
- [x] location.href 보다는 pushState를 사용, spa 모방.
