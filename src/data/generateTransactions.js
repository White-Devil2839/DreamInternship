function getSessionSeed() {
    const storageKey = 'dashboard_seed';
    const existingSeed = sessionStorage.getItem(storageKey);

    if (existingSeed) {
        return parseInt(existingSeed, 10);
    }

    const newSeed = Date.now();
    sessionStorage.setItem(storageKey, newSeed.toString());
    return newSeed;
}

function createSeededRandom(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;

    return function () {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

export const generateTransactions = () => {
    const seed = getSessionSeed();
    const random = createSeededRandom(seed);

    const transactions = [];
    const regions = ['North', 'South', 'East', 'West'];
    const types = ['Online', 'POS', 'Transfer'];

    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const getRandomDate = (start, end) => {
        const startTime = start.getTime();
        const endTime = end.getTime();
        const randomTime = startTime + random() * (endTime - startTime);
        const date = new Date(randomTime);
        return date.toISOString().split('T')[0];
    };

    const getRandomElement = (array) => {
        return array[Math.floor(random() * array.length)];
    };

    const getRandomNumber = (min, max, decimals = 0) => {
        const value = min + random() * (max - min);
        return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value);
    };

    for (let i = 1; i <= 100; i++) {
        const amount = getRandomNumber(8000, 20000);
        const riskScore = getRandomNumber(0, 1, 2);
        const status = riskScore >= 0.7 ? 'Suspicious' : 'Normal';
        const leakagePercentage = getRandomNumber(5, 15, 2);
        const leakage = Math.round(amount * (leakagePercentage / 100));

        transactions.push({
            id: i,
            date: getRandomDate(sixMonthsAgo, today),
            region: getRandomElement(regions),
            type: getRandomElement(types),
            amount: amount,
            leakage: leakage,
            riskScore: riskScore,
            status: status
        });
    }

    return transactions;
};
