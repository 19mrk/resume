const express = require("express");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require("fs");

const app = express();
const PORT = 3002;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/feedback.html");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { name, email, rating, message } = req.body;

    // Define data to be written to Excel
    const data = [
        ["Name", "Email", "Rating", "Message"], // Headers
        [name, email, rating, message]        // Form data
    ];

    const filePath = "form_data.xlsx";

    // Check if file already exists
    if (fs.existsSync(filePath)) {
        // Read existing workbook and append new data
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Add new row
        existingData.push([name, email, rating, message]);

        // Write updated data back to the file
        const updatedSheet = XLSX.utils.aoa_to_sheet(existingData);
        workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
        XLSX.writeFile(workbook, filePath);
    } else {
        // Create a new workbook and write data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, filePath);
    }

    res.send("Form data saved to Excel file!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
