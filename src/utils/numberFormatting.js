export const formatQty4 = quantity => {
    let qty = Number(parseFloat(quantity));
    if (typeof qty !== 'undefined' && qty) {
        if (Math.abs(qty) > 999) {
            qty = Math.floor(qty);
        } else if (Math.abs(qty) < 1) {
            if (qty < 0.0001 && qty > 0) {
                qty = 0.0001;
            } else if (qty > -0.0001 && qty < 0) {
                qty = -0.0001;
            } else {
                qty = qty.toFixed(4);
            }
        } else {
            qty = qty.toFixed(4);
        }
        return Number(qty);
    }
    return null;
};

export const formatQty3 = quantity => {
    let qty = Number(parseFloat(quantity));
    if (typeof qty !== 'undefined' && qty) {
        if (Math.abs(qty) > 999) {
            qty = Math.floor(qty);
        } else if (Math.abs(qty) < 1) {
            if (qty < 0.0001 && qty > 0) {
                qty = 0.0001;
            } else if (qty > -0.0001 && qty < 0) {
                qty = -0.0001;
            } else {
                qty = qty.toFixed(3);
            }
        } else {
            qty = qty.toFixed(2);
        }
        return Number(qty);
    }
    return null;
};

export const formatPriceSteps = (x, long) => {
    if (x) {
        const y = parseFloat(x);
        if (y > 9999) {
            return y.toFixed(2);
        }
        if (y > 999) {
            return y.toFixed(3);
        }
        if (y < 10) {
            if (long) return y.toFixed(8);
            return y.toFixed(6);
        }
        if (y < 1) {
            return y.toFixed(8);
        }
        return y.toFixed(4);
    }
    return null;
};

export const commaSeparate = value => {
    let str;
    if (Number.isNaN(Number(value))) {
        return '';
    }
    if (typeof value !== 'undefined' && value !== null && value !== '') {
        str = value.toString();
    } else {
        return '';
    }
    const splitArr = str.split('.');
    const decimals = splitArr[1];
    let integers = splitArr[0];
    let formattedNum;
    integers = integers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if (decimals?.length) {
        formattedNum = `${integers}.${decimals}`;
    } else {
        formattedNum = integers;
    }
    return formattedNum;
};

export const localeNumberFormatting = (
    value,
    formatStyle,
    formatCurrency = 'USD',
) => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num)) return 'None';

    return num.toLocaleString(undefined, {
        style: formatStyle,
        currency: formatCurrency,
        maximumFractionDigits: 4,
    });
};

export function roundToNearest5(num) {
    if (num % 5 >= 3) {
        return Math.ceil(num / 5) * 5;
    }
    return Math.floor(num / 5) * 5;
}

export const numberFormatter = number =>
    commaSeparate(parseFloat(formatPriceSteps(Number(number))));
