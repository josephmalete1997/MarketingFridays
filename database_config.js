const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// Load the credentials
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "credentials.json")));

// Configure OAuth2 client
const { client_email, private_key } = credentials;
const auth = new google.auth.JWT(client_email, null, private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = "13NCRGh5vdHP47RXLDOG35nZbVQCVA-eQAsa9WZdkWDw";

// Read data
async function readData() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:D10", // Adjust range as needed
    });
    console.log("Data:", response.data.values);
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

// Append data
async function appendData(values) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      resource: {
        values: [values],
      },
    });
    console.log("Data appended:", response.data);
  } catch (error) {
    console.error("Error appending data:", error);
  }
}

// Update data
async function updateData(range, values) {
  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: {
        values: [values],
      },
    });
    console.log("Data updated:", response.data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

// Delete data (requires more logic to identify specific rows)
async function deleteData() {
  // Google Sheets API does not provide a direct way to delete rows or cells.
  // Instead, you will need to clear data from a range or manage it differently.
  // This is an example to clear a range of data.
  try {
    const response = await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: "Sheet1!A2:D10", // Adjust range as needed
    });
    console.log("Data cleared:", response.data);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}

// Example Usage
readData();
appendData(["New", "Data", "Here"]);
updateData("Sheet1!A2", ["Updated", "Data"]);
deleteData();
