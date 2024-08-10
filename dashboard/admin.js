function showSection(section) {
  document
    .querySelectorAll(".section")
    .forEach((sec) => sec.classList.remove("active"));
  document.getElementById(section).classList.add("active");
}

async function addArticle() {
  const title = document.getElementById("article-title").value;
  const body = document.getElementById("article-body").value;

  if (title && body) {
    try {
      const response = await fetch("/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"), // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        const newArticle = await response.json();
        const article = document.createElement("div");
        article.className = "article";
        article.innerHTML = `
            <h3>${newArticle.title}</h3>
            <p>${newArticle.body}</p>
            <button onclick="editArticle(this, ${newArticle.id})">Edit</button>
            <button onclick="deleteArticle(this, ${newArticle.id})">Delete</button>
          `;
        document.getElementById("articles-list").appendChild(article);

        document.getElementById("article-title").value = "";
        document.getElementById("article-body").value = "";
      } else {
        alert("Failed to add article.");
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  } else {
    alert("Please fill in both the title and body.");
  }
}

async function deleteArticle(button, id) {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      button.parentElement.remove();
    } else {
      alert("Failed to delete article.");
    }
  } catch (error) {
    console.error("Error deleting article:", error);
  }
}

async function editArticle(button, id) {
  const article = button.parentElement;
  const title = prompt(
    "Enter new title",
    article.querySelector("h3").textContent
  );
  const body = prompt("Enter new body", article.querySelector("p").textContent);

  if (title && body) {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        article.querySelector("h3").textContent = updatedArticle.title;
        article.querySelector("p").textContent = updatedArticle.body;
      } else {
        alert("Failed to update article.");
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  }
}

async function addEvent() {
  const picture = document.getElementById("event-picture").files[0];
  const datetime = document.getElementById("event-datetime").value;
  const description = document.getElementById("event-description").value;
  const rsvp = document.getElementById("event-rsvp").value;

  if (picture && datetime && description && rsvp) {
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("datetime", datetime);
    formData.append("description", description);
    formData.append("rsvp", rsvp);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const newEvent = await response.json();
        const event = document.createElement("div");
        event.className = "event";
        event.innerHTML = `
            <img src="${newEvent.pictureUrl}" alt="Event Picture" style="width: 100px; height: auto;">
            <p>${newEvent.datetime}</p>
            <p>${newEvent.description}</p>
            <a href="${newEvent.rsvp}" target="_blank">RSVP Here</a>
            <button onclick="editEvent(this, ${newEvent.id})">Edit</button>
            <button onclick="deleteEvent(this, ${newEvent.id})">Delete</button>
          `;
        document.getElementById("events-list").appendChild(event);

        document.getElementById("event-picture").value = "";
        document.getElementById("event-datetime").value = "";
        document.getElementById("event-description").value = "";
        document.getElementById("event-rsvp").value = "";
      } else {
        alert("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  } else {
    alert("Please fill in all fields.");
  }
}

async function deleteEvent(button, id) {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      button.parentElement.remove();
    } else {
      alert("Failed to delete event.");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

async function editEvent(button, id) {
  const event = button.parentElement;
  const datetime = prompt(
    "Enter new date and time",
    event.querySelector("p").textContent
  );
  const description = prompt(
    "Enter new description",
    event.querySelectorAll("p")[1].textContent
  );
  const rsvp = prompt("Enter new RSVP link", event.querySelector("a").href);

  if (datetime && description && rsvp) {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ datetime, description, rsvp }),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        event.querySelectorAll("p")[0].textContent = updatedEvent.datetime;
        event.querySelectorAll("p")[1].textContent = updatedEvent.description;
        event.querySelector("a").href = updatedEvent.rsvp;
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  }
}

async function uploadImage() {
  const image = document.getElementById("upload-image").files[0];

  if (image) {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const newImage = await response.json();
        const img = document.createElement("img");
        img.src = newImage.url;
        img.style.width = "100px";
        img.style.height = "auto";
        document.getElementById("images-list").appendChild(img);

        document.getElementById("upload-image").value = "";
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    alert("Please select an image to upload.");
  }
}

async function addYouTubeVideo() {
  const title = document.getElementById("youtube-title").value;
  const videoId = document.getElementById("youtube-id").value;

  if (title && videoId) {
    try {
      const response = await fetch("/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, videoId }),
      });

      if (response.ok) {
        const newVideo = await response.json();
        const videoElement = document.createElement("div");
        videoElement.className = "youtube-video";
        videoElement.innerHTML = `
            <h3>${newVideo.title}</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${newVideo.videoId}" frameborder="0" allowfullscreen></iframe>
            <button onclick="editYouTubeVideo(this, ${newVideo.id})">Edit</button>
            <button onclick="deleteYouTubeVideo(this, ${newVideo.id})">Delete</button>
          `;
        document
          .getElementById("youtube-videos-list")
          .appendChild(videoElement);

        document.getElementById("youtube-title").value = "";
        document.getElementById("youtube-id").value = "";
      } else {
        alert("Failed to add video.");
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  } else {
    alert("Please fill in both the title and video ID.");
  }
}

async function deleteYouTubeVideo(button, id) {
  try {
    const response = await fetch(`/api/youtube/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      button.parentElement.remove();
    } else {
      alert("Failed to delete video.");
    }
  } catch (error) {
    console.error("Error deleting video:", error);
  }
}

async function editYouTubeVideo(button, id) {
  const videoElement = button.parentElement;
  const title = prompt(
    "Enter new title",
    videoElement.querySelector("h3").textContent
  );
  const videoId = prompt(
    "Enter new YouTube video ID",
    videoElement.querySelector("iframe").src.split("/embed/")[1]
  );

  if (title && videoId) {
    try {
      const response = await fetch(`/api/youtube/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, videoId }),
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        videoElement.querySelector("h3").textContent = updatedVideo.title;
        videoElement.querySelector(
          "iframe"
        ).src = `https://www.youtube.com/embed/${updatedVideo.videoId}`;
      } else {
        alert("Failed to update video.");
      }
    } catch (error) {
      console.error("Error updating video:", error);
    }
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     window.location.href = "/login"; // Redirect to login if no token
//   }

//   fetch("/admin", {
//     headers: {
//       Authorization: token,
//     },
//   })
//     .then((response) => {
//       if (response.status === 401) {
//         window.location.href = "/login";
//       }
//       return response.text();
//     })
//     .then((html) => {
//       document.documentElement.innerHTML = html;
//     })
//     .catch((error) => console.error("Error loading admin page:", error));
// });
