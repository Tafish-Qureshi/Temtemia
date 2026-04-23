const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle form submission logic here
        const input = form.querySelector('input[name="temtem"]');

        if (!input) {
            console.error('Weakness input not found.');
            return;
        }
        
        fetch('https://temtem-api.mael.tech/api/temtems')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched temtems:', data);
            })
            .catch(error => {
                console.error('Error fetching temtems:', error);
            });

        fetch('https://temtem-api.mael.tech/api/weaknesses')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched weaknesses:', data);
                // You can use the fetched data to populate a dropdown or for other purposes
            })
            .catch(error => {
                console.error('Error fetching weaknesses:', error);
            });

        const weakness = input.value;
        // You can add further processing of the weakness value here
    });
}