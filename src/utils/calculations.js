export function calculateTotalRevenue(transactions) {
    return transactions.reduce((sum, txn) => sum + txn.amount, 0);
}

export function calculateTotalLeakage(transactions) {
    return transactions.reduce((sum, txn) => sum + txn.leakage, 0);
}

export function calculateLeakagePercentage(transactions) {
    const totalRevenue = calculateTotalRevenue(transactions);
    const totalLeakage = calculateTotalLeakage(transactions);

    if (totalRevenue === 0) return 0;

    return parseFloat(((totalLeakage / totalRevenue) * 100).toFixed(2));
}

export function calculateAverageTransaction(transactions) {
    if (transactions.length === 0) return 0;

    const totalRevenue = calculateTotalRevenue(transactions);
    return parseFloat((totalRevenue / transactions.length).toFixed(2));
}

export function countSuspiciousTransactions(transactions) {
    return transactions.filter(txn => txn.status === "Suspicious").length;
}

export function groupRevenueByMonth(transactions) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = {};

    transactions.forEach(txn => {
        const date = new Date(txn.date);
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];

        if (!monthlyData[monthName]) {
            monthlyData[monthName] = 0;
        }
        monthlyData[monthName] += txn.amount;
    });

    return Object.keys(monthlyData).map(month => ({
        month,
        revenue: monthlyData[month]
    }));
}

export function groupRevenueByRegion(transactions) {
    const regionData = {};

    transactions.forEach(txn => {
        if (!regionData[txn.region]) {
            regionData[txn.region] = 0;
        }
        regionData[txn.region] += txn.amount;
    });

    return Object.keys(regionData).map(region => ({
        region,
        revenue: regionData[region]
    }));
}

export function groupRiskDistribution(transactions) {
    const normalCount = transactions.filter(txn => txn.status === "Normal").length;
    const suspiciousCount = transactions.filter(txn => txn.status === "Suspicious").length;

    return [
        { name: "Normal", value: normalCount },
        { name: "Suspicious", value: suspiciousCount }
    ];
}
