const parseDate = (dateString) => {
    // Convert the date string to a Date object, handle various formats if necessary
    return new Date(dateString);
};

export const calculateBurns = (rows, numDevs) => {
    rows.forEach(row => {
        row.Created = parseDate(row.Created);
        row.Updated = parseDate(row.Updated);
    });

    const closedStatus = 'Closed';

    if (rows[0].Created && rows[0].Updated) {
        rows.forEach(item => {
            item.ResolutionTime = (item.Updated - item.Created) / (1000 * 60 * 60 * 24);
        });

        const averageResolutionTime = rows.reduce((sum, item) => sum + item.ResolutionTime, 0) / rows.length / numDevs;

        const startDate = new Date(Math.min(...rows.map(item => item.Created)));
        const currentDate = new Date();
        const dates = [];
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }

        const unresolvedCounts = dates.map(date => rows.filter(item => item.Created <= date && item.Updated > date).length);
        const resolvedCounts = dates.map(date => rows.filter(item => item.Updated <= date && item.Status === closedStatus).length);

        const totalIssues = rows.length;
        const remainingIssues = totalIssues - resolvedCounts[resolvedCounts.length - 1];
        const predictedCompletionTimeDays = remainingIssues * averageResolutionTime;
        const predictedCompletionDate = new Date(currentDate.getTime() + predictedCompletionTimeDays * (1000 * 60 * 60 * 24)) || new Date(currentDate.getTime() * (1000 * 60 * 60 * 24));

        const extendedDates = [...dates, predictedCompletionDate];
        const extendedResolvedCounts = [...resolvedCounts, totalIssues];

        // createBurndownChart(dates, unresolvedCounts);
        // createBurnupChart(extendedDates, extendedResolvedCounts, predictedCompletionDate);
        return { dates, unresolvedCounts, resolvedCounts, predictedCompletionDate, extendedDates, extendedResolvedCounts };
    } else {
        console.error('Required date columns ("Created" and "Updated") are missing.');
    }
};
