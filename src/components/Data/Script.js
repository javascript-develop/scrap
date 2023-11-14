// Function to update nutritional information
function updateNutritionalInfo() {
    // Replace with real data extraction or API calls
    const videoId = "VIDEO_ID";
    const protein = 15; // Replace with real protein data
    const fat = 10; // Replace with real fat data
    const carbohydrates = 30; // Replace with real carbohydrates data
    const calories = 250; // Replace with real calories data

    // Update the HTML elements with the nutritional information
    document.getElementById("proteinInfo").textContent = protein + " g";
    document.getElementById("fatInfo").textContent = fat + " g";
    document.getElementById("carbInfo").textContent = carbohydrates + " g";
    document.getElementById("caloriesInfo").textContent = calories + " kcal";
}

// Add an event listener to detect when the iframe has loaded
const youtubeFrame = document.getElementById("youtubeFrame");
youtubeFrame.addEventListener("load", updateNutritionalInfo);