const container = document.getElementById('temtem-container');


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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('temtem-container');
    
    fetch("https://temtem-api.mael.tech/api/temtems")
    .then(res => res.json())
    .then(data => {
        data.forEach(temtem => {
            const card = document.createElement('div');
            card.classList.add('temtem-card');
            
            // Type badges
            const typeBadges = (temtem.types || []).map(t => `<span class="type-badge" style="background:${getTypeColor(t)}">${t}</span>`).join(' ');
            
            // Evolutions
            const evolutions = (temtem.evolutions && temtem.evolutions.length > 0) ? temtem.evolutions.join(' → ') : 'None';
            
            // Moves
            const moves = (temtem.moves && temtem.moves.length > 0) ? temtem.moves.join(', ') : 'None';
            
            // Afbeelding (veilig checken)
            const imgSrc = `https://wsrv.nl/?url=${encodeURIComponent(temtem.portraitWikiUrl)}`;
            
            card.innerHTML = `
            <img src="${imgSrc}" alt="${temtem.name}" class="temtem-img">
            <h2>${temtem.name}</h2>
            <p><strong>Number:</strong> ${temtem.number}</p>
            <p class="types"><strong>Types:</strong> ${typeBadges}</p>
            <p><strong>Evolutions:</strong> ${evolutions}</p>
            <p><strong>Moves:</strong> ${moves}</p>
            `;
            
            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error fetching Temtem data:", err));
});
