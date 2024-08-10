import { articlesArray } from "../Articles/article_object.js";

const mainParagraph = document.querySelector("main p");
const nextEvent = document.querySelector(".next-event");
const latestArticle = document.querySelector(".latest-article");

// const wordsArray = mainParagraph.innerHTML.split(" ");
// function textShortener() {
//   if (wordsArray.length > 140) {
//     mainParagraph.innerHTML =
//       wordsArray.slice(0, 140).join(" ") + `<span class='read-more'>Read more</span>`;
//   }
// }

// textShortener();

// function readMore() {
//   mainParagraph.innerHTML = wordsArray.join(" ") + `<span class='read-less'>Show less</span>`;
// }

const nextEventImage = `url(/Events/images/Invite_28_August_2020.jpg)`;

function getNextEvent() {
  const eventMain = document.createElement("div");
  eventMain.classList.add("next-event-main");
  const eventLeft = document.createElement("div");
  const eventRight = document.createElement("div");
  eventLeft.style.backgroundImage = `${nextEventImage}`;

  eventLeft.classList.add("next-event-image");
  eventRight.classList.add("next-event-right");

  const h2 = document.createElement("h2");
  h2.innerHTML = `Our Next Event`;
  const rsvpButton = document.createElement("button");
  const viewEvent = document.createElement("button");
  viewEvent.classList.add("button");
  viewEvent.classList.add("view");
  rsvpButton.classList.add("button");
  rsvpButton.classList.add("rsvp");
  rsvpButton.innerHTML = "RSVP Here";
  viewEvent.innerHTML = "View Event";
  eventRight.append(rsvpButton, viewEvent);
  eventMain.append(eventLeft, eventRight);
  nextEvent.append(h2, eventMain);
}

getNextEvent();

function getLatestArticle() {
  const h2 = document.createElement("h2");
  h2.textContent = "Latest Article";

  const recentArticle = document.createElement("div");
  recentArticle.classList.add("recent-article");

  const img = document.createElement("img");
  img.src = `./Articles/${articlesArray[0].image}`;
  img.width = "50%";
  img.alt = "Article image";

  const link = document.createElement("a");
  link.href = "/Articles/article.html";
  link.textContent = articlesArray[0].title;

  link.addEventListener("click", () => {
    localStorage.setItem("current-article", JSON.stringify(articlesArray[0]));
  });

  recentArticle.append(img, link);
  latestArticle.append(h2, recentArticle);
}

getLatestArticle();

setInterval(() => {
  const showLess = document.querySelector(".read-less");
  const more = document.querySelector(".read-more");
  if (showLess) showLess.addEventListener("click", textShortener);
  if (more) more.addEventListener("click", readMore);
}, 100);
