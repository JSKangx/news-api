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
    xhr.open("get", `https://newsapi.org/v2/everything?q=${inputNode.value}&from=${fullDate}&sortBy=popularity&apiKey=17a2a0dcb72d4c5ea77659cbb60e8c15`);
  });
}

// 템플릿 리터럴로 얻어온 API를 마크업으로 만들어주는 비동기 함수
async function createMarkUp() {
  const data = await getApis();
}

// 검색 이벤트시 실행되는 함수 정의
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
