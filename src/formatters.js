const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
};

const dateTimeOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

const DateFormatter = new Intl.DateTimeFormat('pt-BR', dateOptions);

const DateTimeFormatter = new Intl.DateTimeFormat('pt-BR', dateTimeOptions);

const CurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

const StringFormatter = {
    Capitalize: (str) => {
        const exceptions = ['do', 'da', 'de', 'o', 'a', 'e'];
        const palavras = str.toLowerCase().split(' ');
        const palavrasFormatadas = palavras.map((palavra, index) => {
            if (exceptions.includes(palavra) && index !== 0) {
                return palavra;
            } else {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1);
            }
        });
        return palavrasFormatadas.join(' ');
    }
};

const NumberFormatter = {
    format: (number, digits, decimals = 0) => {
        const integerPart = Math.floor(number).toString();
        const decimalPart = decimals > 0 ? 
            number.toFixed(decimals).split('.')[1] : '';
        const formattedIntegerPart = integerPart.padStart(digits, '0');
        return decimals > 0 ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
    }
};

export { DateFormatter, DateTimeFormatter, CurrencyFormatter, NumberFormatter, StringFormatter };