const reviewPanel = document.querySelector(".reviews");

const reviewsArray = [
  {
    name: `Lesego Ntsoele`,
    review: `What a lovely community to learn from and network with. The food was sumptuous and the hosts made us feel so welcomed. The wealth of information from the speaker is note worthy! Bring a bigger notebook and fresh ballpoint pen. I thoroughly enjoyed my first gathering and I cannot wait for the next one!`,
    rating: 5,
    image: ``,
  },
  {
    name: `Anele Ndlovu`,
    review: `I attended my first “Marketing Fridays” in December 2023 and I loved everything about it. The small group setting allowed for intimate discussions and for everyone to get to know each other. Being there reminded me of my love for marketing! If you’re a marketer or aspiring marketer, Marketing Fridays is the place to be.`,
    rating: 5,
    image: ``,
  },
  {
    name: `Paulin Tchoualak Lenteu`,
    review: `Very convivial and intimate. The guest was a great presenter with vast experience. I can't wait for the organisation to morph into training and workshops or even bootcamps for longer times.`,
    rating: 5,
    image: ``,
  },
  {
    name: `Setha Nala`,
    review: `The best network sessions for marketers in town! Excellent in everything!`,
    rating: 5,
    image: ``,
  },
];

const star = `
<svg xmlns="http://www.w3.org/2000/svg" fill="#ffc107" viewBox="0 0 576 512" width="20"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;

function getReviews() {
  for (let i = 0; i < reviewsArray.length; i++) {
    const review = document.createElement("div");
    review.className = "review";
    review.innerHTML = `
      <div class="review-image"></div>
      <div class="review-text">
        <h2>${reviewsArray[i].name}</h2> <div class="rating">
          ${star.repeat(reviewsArray[i].rating)}
        </div>
        <p>${reviewsArray[i].review}</p>
      </div>
    `;
    reviewPanel.append(review);
  }
}

getReviews();

const scrollAmount = reviewPanel.clientWidth;
const scrollInterval = 25000;

function autoScroll() {
  const reviewsContainer = document.querySelector(".reviews");
  let scrollPosition = 0;

  const scrollStep = () => {
    scrollPosition += scrollAmount;
    const maxScrollLeft = reviewsContainer.scrollWidth - reviewsContainer.clientWidth;

    if (scrollPosition > maxScrollLeft) {
      scrollPosition = 0;
    }

    reviewsContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  setInterval(scrollStep, scrollInterval);
}

autoScroll();
