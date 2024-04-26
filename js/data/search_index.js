function submitForm() {
  const searchQuery = document.getElementById("searchQuery").value;
  window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
  document.getElementById("searchQuery").value = "";
}

document.getElementById("searchForm").onsubmit = function (e) {
  e.preventDefault();
  submitForm();
};

document.getElementById("search_icon").addEventListener("click", submitForm);
