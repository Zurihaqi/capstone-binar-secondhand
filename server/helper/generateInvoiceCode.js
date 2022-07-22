const generateInvoiceCode = () =>
  Math.random().toString(36).slice(-6).toUpperCase();
const invoice_code = generateInvoiceCode();

module.exports = invoice_code;
