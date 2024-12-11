const API_KEY = "SUA_CHAVE_DE_API";
const API_URL = "https://open.er-api.com/v6/latest";

async function loadCurrencies() {
    try {
        const response = await fetch(`${API_URL}/USD?apikey=${API_KEY}`);
        const data = await response.json();

        if (!data.rates) {
            throw new Error("Erro ao carregar as moedas.");
        }

        const currencies = Object.keys(data.rates);

        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    } catch (error) {
        console.error("Erro ao carregar moedas:", error);
        document.getElementById('result').textContent = "Erro ao carregar moedas.";
    }
}
async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = "Por favor, insira um valor válido.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${fromCurrency}?apikey=${API_KEY}`);
        const data = await response.json();

        if (!data.rates || !data.rates[toCurrency]) {
            throw new Error("Erro ao obter a taxa de câmbio.");
        }

        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById('result').textContent = 
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Erro na conversão:", error);
        document.getElementById('result').textContent = "Erro ao realizar a conversão.";
    }
}
document.addEventListener('DOMContentLoaded', loadCurrencies);
