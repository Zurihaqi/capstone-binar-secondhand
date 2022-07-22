module.exports = generateInvoiceCode = () =>
  Math.random().toString(36).slice(-6).toUpperCase();
