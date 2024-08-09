const upcomingEvent = document.querySelector(".upcoming-event");
const upcomingEventImage = document.querySelector(".upcoming-event-image");
const pastEvents = document.querySelector(".past-events");

const upcomingEventObject = {
  name: "MarketingFridays",
  image: "./images/Marketing+Fridays+-+KAYLYNN.jpg",
};

upcomingEventImage.style.backgroundImage = `url(${upcomingEventObject.image})`;

const eventsObject = [
  {
    title: "MarketingFridays",
    image: "./images/invite+28+August+2020.jpg",
  },
  {
    title: "MarketingFridays",
    image: "./images/marketing_fridays_Zubeida_Goolam_edit.jpg",
  },
  {
    title: "MarketingFridays",
    image: "./images/Marketing+Friday_Tibz.jfif",
  },
  {
    title: "MarketingFridays",
    image: "./images/Marketing+Fridays_Abey+Mokgwatsane.jpg",
  },
  {
    title: "MarketingFridays",
    image: "./images/Marketing+Fridays+Facebook+Lesedi+M.jpg",
  },
  {
    title: "MarketingFridays",
    image: "./images/Webinar+Invite+Marketing+Fridays.jpg",
  },
];

function getPastEvents() {
  eventsObject.forEach((item, index) => {
    const pastEvent = document.createElement("div");
    pastEvent.classList.add("past-event");
    pastEvent.style.backgroundImage = `url(${item.image})`;
    pastEvents.append(pastEvent);
  });
}

getPastEvents();
