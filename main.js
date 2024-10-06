"use strict";

let inputNode = document.getElementById("searchBar");
let articlesNode = document.querySelector(".articles");
let myForm = document.querySelector(".form");

// Ajax 통신으로 news API를 얻어오는 함수
function getApis() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    // url에 들어갈 현재 날짜 정보 얻기
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let fullDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;

    // 요청할 url 설정
    let url = `https://newsapi.org/v2/everything?q=${inputNode.value}&to=${fullDate}&sortBy=publishedAt&apiKey=17a2a0dcb72d4c5ea77659cbb60e8c15`;

    // 요청할 정보 초기화
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = function () {
      // 서버에서 데이터가 제대로 넘어왔다면
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        console.log("데이터를 가져오는 과정에서 에러가 발생했습니다.");
        articlesNode.innerHTML = "데이터를 가져오는 과정에서 에러가 발생했습니다.";
      }
    };
  });
}

// 템플릿 리터럴로 얻어온 API를 마크업으로 만들어주는 비동기 함수
async function createMarkUp() {
  const data = await getApis();
  const ARTICLES = data["articles"];

  Array.from(ARTICLES).forEach((article) => {
    if (article["author"] !== null && article["title"] !== "[Removed]" && article["description"] !== "[Removed]" && article["urlToImage"] !== null) {
      let span1 = document.createElement("span");
      let author = article["author"];
      span1.appendChild(document.createTextNode(author));
      span1.appendChild(document.createTextNode(" - "));

      let span2 = document.createElement("span");
      let time = article["publishedAt"];
      span2.appendChild(document.createTextNode(time));
      span2.appendChild(document.createTextNode(" - "));

      let link = document.createElement("a");
      let url = article["url"];
      link.setAttribute("href", `${url}`);
      link.appendChild(document.createTextNode("more"));

      let div = document.createElement("div");
      div.appendChild(span1);
      div.appendChild(span2);
      div.appendChild(link);

      let h2 = document.createElement("h2");
      let title = article["title"];
      h2.appendChild(document.createTextNode(title));

      let p = document.createElement("p");
      let desc = article["description"];
      p.appendChild(document.createTextNode(desc));

      let contentsSection = document.createElement("section");
      contentsSection.setAttribute("class", "article-contents");
      contentsSection.appendChild(h2);
      contentsSection.appendChild(div);
      contentsSection.appendChild(p);

      let cover = document.createElement("img");
      cover.setAttribute("src", `${article["urlToImage"]}`);
      let articleCover = document.createElement("section");
      articleCover.setAttribute("class", "article-cover");
      articleCover.appendChild(cover);

      let item = document.createElement("article");
      item.setAttribute("class", "article");
      item.appendChild(contentsSection);
      item.appendChild(articleCover);

      let hr = document.createElement("hr");

      articlesNode.appendChild(item);
      articlesNode.appendChild(hr);
    }
  });
}

// 검색 이벤트시 실행되는 함수 정의
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  articlesNode.innerHTML = "";
  createMarkUp();
  inputNode.value = "";
});
