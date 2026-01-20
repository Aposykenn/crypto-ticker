let bitcoinSection = document.getElementById('btc')
let ethereumSection = document.getElementById('eth')
let tetherSection = document.getElementById('usdt')

async function fetchCryptoData() { // Fetch data from API
    try {
        // API endpoint for fetching data
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd,try');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json(); // Parse the JSON response
        return data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return null;
    }
}

function updateCryptoSection(section, name, data) { // Update section with fetched data
    if (!data) {
        section.innerHTML = `<p>Error loading data for ${name}.</p>`;
        return;
    } else {
        section.innerHTML = `
            <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <p>USD: $${data.usd}</p>
            <p>TRY: ₺${data.try}</p>
        `;
    }
}

async function refreshCryptoData() { // Refresh data and update sections
    const cryptoData = await fetchCryptoData();
    if (cryptoData) {
    updateCryptoSection(bitcoinSection, 'bitcoin', cryptoData.bitcoin);
    updateCryptoSection(ethereumSection, 'ethereum', cryptoData.ethereum);
    updateCryptoSection(tetherSection, 'tether', cryptoData.tether);
    }
}
// Initial data fetch
refreshCryptoData();
setInterval(refreshCryptoData, 30000);