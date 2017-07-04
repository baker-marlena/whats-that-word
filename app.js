let resultsPages = {}

$("#search-form").submit(event => {
  event.preventDefault();
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
  const API_URL = 'https://api.datamuse.com';
  let searchTerm = $("#search-term").val();
  console.log(searchTerm)
  $.ajax({
  url: `${CORS_PROXY}${API_URL}/words?ml=${searchTerm}`,
  type: 'GET',
  success: (results) => {
    console.log(results)
    sortResults(results);
  }
});
})

function sortResults(searchResults) {
  let pageCount = Math.floor((searchResults.length + 1) /25);
  for (var i = 1; i <= pageCount; i++) {
    resultsPages[`page${i}`] = [];
    if (i == 1) {
      for (let j = 1; j <= 25; j++) {
        resultsPages[`page${i}`].push(searchResults[j-1])
      }
    }
    else{
      for (let j = 1 + ((i-1)*25); j <= (25*i); j++) {
        resultsPages[`page${i}`].push(searchResults[j-1])
      }
    }
  }
  populatePage(1);
  setPages(pageCount);
}

function setPages(pageCount) {
  let pages = ''
  for (var i = 1; i <= pageCount; i++) {
    if (i == 1) {
      pages = pages + `<a onclick='populatePage(1)' id="page1">1</a>`;
    }
    else{
      pages = pages + ` / <a onclick='populatePage(${i})' id="page${i}">${i}</a>`
    }
  }
  $("#page-number").html(pages);
}

function populatePage(page){
  $("#search-results").html('')
  resultsPages[`page${page}`].forEach(words => {
    $("#search-results").append(`<p>${words.word}</p>`)
  })
}
