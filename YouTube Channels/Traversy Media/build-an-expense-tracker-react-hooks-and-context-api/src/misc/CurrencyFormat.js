/**
 * Formats a field with the currency unit.
*/
const RE_NOTNUMBER = /\D/g;

/**
 * Create a function to standardize the number's formatting.
 * 
 * @param {string} locale locale given http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry.
 * @param {string} currency currency given http://www.currency-iso.org/en/home/tables/table-a1.html.
 * 
 * @returns value into currency string.
 */
export function formatCurrency(locale, currency, value) {
    let num = Math.sign(value) * parseInt(value.replace(RE_NOTNUMBER, ""), 10) / 100;
    let str = "";

    if (!isNaN(num)) {
        str = num.toLocaleString(locale, { "style": "currency", "currency": currency });
    }

    return str;
}
