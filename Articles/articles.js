const container = document.querySelector(".marketing-thoughts");
const pagination = document.querySelector(".pagination");
const currentPageDescription = document.querySelector(".pages-section p");

// console.log(articlesArray);
articlesArray.forEach((item, index) => {
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
});

const pages = {
  value: Math.floor(articlesArray.length / 4),
  number: 1,
};

function paginate() {
  for (let i = 0; i < pages.value; i++) {
    const page = document.createElement("div");
    page.innerHTML = i + 1;
    page.classList.add("page");
    pagination.append(page);
  }
}

paginate();

function clearActiveStatus() {
  const page = document.querySelectorAll(".page");
  page.forEach((page) => {
    page.classList.remove("active-page");
  });
}

currentPageDescription.innerHTML = `Page 1 of ${pages.value}`;

function activePage() {
  const page = document.querySelectorAll(".page");
  page[0].classList.add("active-page");
  page.forEach((page, index) => {
    page.addEventListener("click", () => {
      clearActiveStatus();
      page.classList.add("active-page");
      currentPageDescription.innerHTML = `Page ${index + 1} of ${pages.value}`;
    });
  });
}

activePage();

fetch("./articles.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  body: JSON.stringify(articlesArray), // Convert the data to a JSON string
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    console.log("Success:", data); // Handle the success response
  })
  .catch((error) => {
    console.error("Error:", error); // Handle any errors
  });
