function loadTemtems() {
    const Teambuilder = document.getElementById("team-builder");

    // Functie om type badges kleur te geven
    function getTypeColor(type) {
        const colors = {
            Nature: '#4fa3ff',
            Fire: '#ff6b6b',
            Water: '#1e90ff',
            Electric: '#f7c948',
            Mental: '#9b59b6',
            Melee: '#e67e22',
            Crystal: '#a3d2ca',
            Wind: '#76c7c0',
            Toxic: '#2ecc71',
            Digital: '#34495e',
            Neutral: '#bdc3c7',
            Earth: '#7b3f00'
        };
        return colors[type] || '#999';
    }


    fetch("https://temtem-api.mael.tech/api/temtems")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((temtem) => {
                const card = document.createElement("div");
                card.classList.add("temtem");

                const typeBadges = (temtem.types || [])
                    .map((type) => `<span class="type-badge" style="background-color: ${getTypeColor(type)}; ">${type}</span>`)
                    .join(" ");

                // Afbeelding (veilig checken)
                const imgSrc = `https://wsrv.nl/?url=${encodeURIComponent(temtem.portraitWikiUrl || temtem.sprite || "")}`;

                card.innerHTML = `
            <img src="${imgSrc}" alt="${temtem.name}" class="temtem-img">
            <h2>${temtem.name}</h2>
            <p><strong>Number:</strong> ${temtem.number}</p>
            <p class="types"><strong>Types:</strong> ${typeBadges}</p>
            `;

                Teambuilder.appendChild(card);

                if (temtem.evolutions && temtem.evolutions.length > 0) {
                    const evolutions = document.createElement("p");
                    evolutions.innerHTML = `<strong>Evolutions:</strong> ${temtem.evolutions.join(" → ")}`;
                    card.appendChild(evolutions);
                }
            });
        });
}


function filterTemtems() {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const temtemCards = document.querySelectorAll(".temtem");
        temtemCards.forEach((card) => {
            const name = card.querySelector("h2").textContent.toLowerCase();
            const types = Array.from(card.querySelectorAll(".type-badge")).map(badge => badge.textContent.toLowerCase());
            if (name.includes(filter) || types.some(type => type.includes(filter))) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

loadTemtems();
filterTemtems();