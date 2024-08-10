import { articlesArray } from "./article_object.js";

const container = document.querySelector(".marketing-thoughts");
const pagination = document.querySelector(".pagination");
const currentPageDescription = document.querySelector(".pages-section p");

const articlesPerPage = 4;
const pages = {
  value: Math.ceil(articlesArray.length / articlesPerPage),
  number: localStorage.getItem("page-no") || 1,
};

function renderArticles(page) {
  container.innerHTML = "";

  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = Math.min(startIndex + articlesPerPage, articlesArray.length);

  for (let i = startIndex; i < endIndex; i++) {
    const item = articlesArray[i];
    const article = document.createElement("div");
    article.classList.add("article");

    const articleImage = document.createElement("div");
    articleImage.classList.add("article-image");

    const articleDate = document.createElement("div");
    articleDate.classList.add("article-date");

    const articleTitle = document.createElement("div");
    articleTitle.classList.add("article-title");

    articleImage.style.backgroundImage = `url(${item.image})`;

    function getArticle() {
      window.location.href = "article.html";
      localStorage.setItem("current-article", JSON.stringify(item));
    }

    articleImage.addEventListener("click", () => {
      getArticle();
    });

    articleTitle.addEventListener("click", () => {
      getArticle();
    });

    articleDate.innerHTML = `${item.date}`;
    articleTitle.innerHTML = `${item.title}`;
    article.append(articleImage, articleDate, articleTitle);
    container.append(article);
  }

  currentPageDescription.innerHTML = `Page ${page} of ${pages.value}`;
}

function paginate() {
  pagination.innerHTML = "";

  for (let i = 1; i <= pages.value; i++) {
    const page = document.createElement("div");
    page.innerHTML = i;
    page.classList.add("page");
    pagination.append(page);
  }
}

function clearActiveStatus() {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active-page");
  });
}

function activePage() {
  const pageElements = document.querySelectorAll(".page");

  pageElements.forEach((pageElement, index) => {
    pageElement.addEventListener("click", () => {
      clearActiveStatus();
      pageElement.classList.add("active-page");
      renderArticles(index + 1);
      localStorage.setItem("page-no", index + 1);
    });
  });

  if (pageElements.length > 0) {
    pageElements[pages.number - 1].classList.add("active-page");
    renderArticles(pages.number);
  }
}

document.querySelectorAll(".page")[pages.number - 1];

paginate();
activePage();

fetch("./articles.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(articlesArray),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
