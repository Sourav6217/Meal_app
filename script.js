document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");
    const mealsContainer = document.getElementById("meals");

    searchButton.addEventListener("click", searchMeals);

    function searchMeals() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === "") {
            alert("Please enter a meal to search.");
            return;
        }

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                displayMeals(data.meals);
            })
            .catch((error) => {
                console.error("Error fetching meals:", error);
                alert("An error occurred while fetching meals.");
            });
    }

    function displayMeals(meals) {
        mealsContainer.innerHTML = "";

        if (!meals) {
            mealsContainer.innerHTML = "<p>No meals found.</p>";
            return;
        }

        meals.forEach((meal) => {
            const mealCard = document.createElement("div");
            mealCard.classList.add("meal-card");
            mealCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            `;
            mealsContainer.appendChild(mealCard);
        });
    }
});
