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
  popular: "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
  image: "https://image.tmdb.org/t/p",
};

export const changeKorToUrl = (korString) => {
  return encodeURIComponent(korString);
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
