
let characters = [];

document.addEventListener("DOMContentLoaded", function () {
    showCharacters(characters);
});

const animalslist = document.getElementById("animals");
const img = document.getElementById("character-image");
const votecount = document.getElementById("votes-form");
const characterContent = document.getElementById("animals-character"); // Added this line

fetch("http://localhost:3000/characters", {
    method: "GET",
    headers: {
        "content-type": "application/json",
    },
})
    .then((data) => data.json())
    .then((Response) => {
        characters = [...Response];
        showCharacters(characters);
    });

function showCharacters(characters) {
    const characterInfo = document.getElementById("animals");
    characterInfo.innerHTML = ''; // Clear the existing content.

    for (let character of characters) {
        const span = document.createElement("span");
        span.innerText = character.name;
        span.setAttribute("id", character.id);
        span.style.color = "blue";
        span.style.fontSize = "16px";
        span.style.margin = "10px";
        span.style.border = "4px";
        // Append each span to the characterInfo container
        characterInfo.appendChild(span);

        span.addEventListener("click", (event) => {
            const selectedCharacter = getCharacterById(characters, parseInt(event.target.id));
            showCharacterContent(selectedCharacter);
        });
    }
}

function showCharacterContent(character) {
    // Display the character's image
    img.src = character.image;
    
    // You can also update other elements like vote count as needed
    // For example: votecount.innerText = `Total Votes: ${character.votes}`;

    // Clear the previous character content
    characterContent.innerHTML = '';

    // Display the character's name
    const characterName = document.createElement("h3");
    characterName.innerText = character.name;
    characterContent.appendChild(characterName);
}

function getCharacterById(characters, id) {
    return characters.find((character) => character.id === id);
}



