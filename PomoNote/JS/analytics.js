function getCurrentUserId() {
    return 'user123'; // Example user ID
}

let studyChart; // Global chart variable

// Converts an week string into a Date the start of that week
function weekToDate(weekString) {
    const [year, week] = weekString.split('-W');
    const firstDayOfYear = new Date(year, 0, 1);
    const days = (week - 1) * 7 - firstDayOfYear.getDay();
    return new Date(year, 0, days);
}

// Function to get user study data for a given week
function getUserStudyData(userId, weekString) {
    const allStudyData = {
        'user123': {
            '2023-12-08': 16, '2023-12-09': 34, '2023-12-10': 67, '2023-12-11': 61, '2023-12-12': 38, '2023-12-13': 12, '2023-12-14': 35,
             '2023-12-01': 48, '2023-12-02': 30, '2023-12-03': 4, '2023-12-04': 61, '2023-12-05': 65, '2023-12-06': 19, '2023-12-07': 114,
            '2023-11-24': 56, '2023-11-25': 46, '2023-11-26': 45, '2023-11-27': 79, '2023-11-28': 36, '2023-11-29': 83, '2023-11-30': 64,
            '2023-11-17': 52, '2023-11-18': 43, '2023-11-19': 60, '2023-11-20': 10, '2023-11-21': 46, '2023-11-22': 35, '2023-11-23': 15,
            '2023-11-10': 80, '2023-11-11': 50, '2023-11-12': 63, '2023-11-13': 13, '2023-11-14': 10, '2023-11-15':53, '2023-11-16': 25,
            '2023-12-15': 65, '2023-12-16': 31,'2023-12-17': 46, 
        }
    };

    let studyData = {};
    let startDate = weekToDate(weekString); // Convert the week string to a Date

    for (let i = 0; i < 7; i++) {
        let date = new Date(startDate);
        date.setDate(date.getDate() + i);
        let dateString = date.toISOString().split('T')[0];
        studyData[dateString] = allStudyData[userId][dateString] || 0;
    }

    return studyData;
}

function populateWeekPicker() {
    let weekPicker = document.getElementById('weekPicker');
    let today = new Date();
    let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    weekPicker.max = getFormattedDate(today);
    weekPicker.min = getFormattedDate(lastMonth);

    let startOfWeek = getFormattedDate(new Date(today.setDate(today.getDate() - today.getDay())));
    weekPicker.value = `${today.getFullYear()}-W${getWeekNumber(today)}`;
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

function getFormattedDate(date) {
    return date.toISOString().split('T')[0];
}

function updateChartData(userId, weekString) {
    const studyData = getUserStudyData(userId, weekString); // Pass the week string

    const chartData = Object.values(studyData);
    studyChart.data.datasets[0].data = chartData;
    studyChart.update();

    const totalMinutes = chartData.reduce((a, b) => a + b, 0);
    document.getElementById('completedScore').textContent = 'Total minutes studied this week: ' + totalMinutes;
}

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('studyChart').getContext('2d');
    studyChart = new Chart(ctx, {
         type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Minutes Studied',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(199, 199, 199, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    populateWeekPicker();
    const currentUserId = getCurrentUserId();
    updateChartData(currentUserId, weekPicker.value); // Use the week picker value directly

    document.getElementById('weekPicker').addEventListener('change', function(e) {
        updateChartData(currentUserId, e.target.value);
    });
});
