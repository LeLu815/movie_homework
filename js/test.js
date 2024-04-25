const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ5MzRmNzg4ZjRlYzI1NmViY2RlYzcyNzVhMDdlZCIsInN1YiI6IjY2MjdhNGMyNjJmMzM1MDE2NGQ5ZDU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UrmYmAFfVZN-YSlLPyTfP10QreSXWz1VYKRQeak1yxU",
  },
};
// encodeURIComponent
const langUrl = "https://api.themoviedb.org/3/configuration/languages";
const url = "https://api.themoviedb.org/3/movie/popular?language=ko&page=1";
export const data = fetch(url, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// t;

// function GuessNum() {
//   this.count = 0
//   this.ramdomNum = Math.random().toFixed(2) * 100;
//   this.answer = function(userInput) {
//     this.count++
//     console.log(`숫자 입력 : ${userInput}`);
//     if (userInput < this.ramdomNum) {
//       console.log("UP")
//     } else if (userInput > this.ramdomNum) {
//       console.log("DOWN")
//     } else {
//       console.log("CORRECT");
//       console.log(`숫자 입력한 횟수 : ${this.count}`);
//     }
//   }
// }

// const leein = new GuessNum()
// console.log(leein.ramdomNum())
// leein.answer(12)
