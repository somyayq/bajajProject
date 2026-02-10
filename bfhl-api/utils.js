const getFibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    let series = [0, 1];
    while (series.length < n) {
        series.push(series[series.length - 1] + series[series.length - 2]);
    }
    return series.slice(0, n);
};

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const getHCF = (arr) => arr.reduce((acc, val) => gcd(acc, val));

const getLCM = (arr) => arr.reduce((acc, val) => (acc * val) / gcd(acc, val));

module.exports = { getFibonacci, isPrime, getHCF, getLCM };
