const currencyFormatter = (amount) => {
    return `${amount.toLocaleString('id-ID', {style:'currency', currency:'IDR'})}`;
}

export default currencyFormatter;