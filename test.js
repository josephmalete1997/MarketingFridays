// The URL of the API endpoint to which you want to post data
const apiUrl =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent("http://jjmpire.6te.net/database.json");

// The data you want to push to the database
const dataToSend = {
  key1: "value1",
  key2: "value2",
  // Add other key-value pairs as needed
};

// Make a POST request to the API
fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  body: JSON.stringify(dataToSend), // Convert the data to a JSON string
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

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => console.log(data.contents))
  .catch((error) => console.error("Error:", error));
