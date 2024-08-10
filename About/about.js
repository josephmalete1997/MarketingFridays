const aboutImagesDisplay = document.querySelector(".about-images");
const overLayer = document.querySelector(".over-layer");

const imagesArray = [
  {
    src: `images/a1.jpg`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a2.jpg`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a3.jpg`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a4.jpg`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a5.jpg`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a6.jpg`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a7`,
    alt: `marketing Fridays images`,
  },
  {
    src: `images/a8`,
    alt: `marketing Fridays images`,
  },
];

const imageObject = {
  src: null,
};

const countObject = {
  value: 0,
};

function generateImagePanels() {
  imagesArray.forEach((item, index) => {
    const imageItem = document.createElement("div");
    imageItem.classList.add("about-images-item");
    imageItem.style.backgroundImage = `url(${item.src})`;
    imageItem.addEventListener("click", () => {
      popUpScroll([item.src, index]);
    });
    aboutImagesDisplay.append(imageItem);
  });
}

generateImagePanels();

function popUpScroll(arg) {
  overLayer.innerHTML = "";
  imageObject.src = arg[0];
  imageObject.index = arg[1];
  const close = document.createElement("div");
  close.classList.add("close");
  const left = document.createElement("div");
  const right = document.createElement("div");
  const text = document.createElement("h2");
  const textCopyRight = document.createElement("p");
  textCopyRight.innerHTML = `Copyright &copy;${new Date().getFullYear()} | <b>Marketing Fridays</b>`;
  text.innerHTML = `${imageObject.index + 1} / ${imagesArray.length}`;
  text.classList.add("scroll-text");
  textCopyRight.classList.add("text-copy-right");
  left.classList.add("left");
  right.classList.add("right");

  close.innerHTML = timesSign;
  right.innerHTML = rightChevron;
  left.innerHTML = leftChevron;

  const image = document.createElement("div");
  image.classList.add("pop-up-image-scroll");
  image.style.backgroundImage = `url(${imageObject.src})`;
  image.append(text, textCopyRight);
  overLayer.append(image, close, left, right);
  overLayer.style.display = "flex";
  document.body.style.overflow = "hidden";
  countObject.value = imageObject.index;
  activateSlide();
}

function removeChildren(parent, children) {}
function activateSlide() {
  const close = document.querySelector(".close");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const imageScroll = document.querySelector(".pop-up-image-scroll");
  const text = document.querySelector(".scroll-text");

  close.addEventListener("click", () => {
    overLayer.style.display = "none";
    document.body.style.overflow = "auto";
    imageObject.src = 0;
    countObject.value = 0;
  });

  right.addEventListener("click", () => {
    countObject.value = countObject.value + 1;
    if (countObject.value > imagesArray.length - 1) countObject.value = 0;
    text.innerHTML = `${countObject.value + 1} / ${imagesArray.length}`;
    imageScroll.style.backgroundImage = `url(${imagesArray[countObject.value].src})`;
  });

  left.addEventListener("click", () => {
    countObject.value = countObject.value - 1;
    if (countObject.value < 0) countObject.value = imagesArray.length - 1;
    text.innerHTML = `${countObject.value + 1} / ${imagesArray.length}`;
    imageScroll.style.backgroundImage = `url(${imagesArray[countObject.value].src})`;
  });
}
