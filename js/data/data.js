const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ5MzRmNzg4ZjRlYzI1NmViY2RlYzcyNzVhMDdlZCIsInN1YiI6IjY2MjdhNGMyNjJmMzM1MDE2NGQ5ZDU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UrmYmAFfVZN-YSlLPyTfP10QreSXWz1VYKRQeak1yxU",
  },
};

// encodeURIComponent
export const urlAddress = {
  langUrl: "https://api.themoviedb.org/3/configuration/languages",
  playing: "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=2",
  popular: "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
  top: "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=3",
  upcoming: "https://api.themoviedb.org/3/movie/upcoming?language=ko&page=4",
};

export const changeKorToUrl = (korString) => {
  return encodeURIComponent(korString);
};

export const searchData = async (keyword) => {
  const urlString = changeKorToUrl(keyword);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${urlString}&include_adult=false&language=ko&page=1`,
      options
    );
    const data = await response.json(response);
    return data;
  } catch (error) {
    return error;
  }
};

export const getData = async (url, loadingId = "loader") => {
  document.getElementById(loadingId).style.display = "block";
  try {
    const response = await fetch(url, options);
    const data = await response.json(response);
    document.getElementById(loadingId).style.display = "none";
    return data;
  } catch (error) {
    document.getElementById(loadingId).style.display = "none";
    return error;
  }
};

export const getImage = async (imgUrl, size) => {
  try {
    const imageUrl = await fetch(`${urlAddress.image}/${size}${imgUrl}`);
  } catch (error) {
    return error;
  }
};
