// Get Today and Yesterday (Y-m-d)
const _today = new Date();
const _yesterday = new Date();
_yesterday.setDate(_yesterday.getDate() - 1);

// today yesterday
const today = `${_today.getFullYear()}-${String(_today.getMonth() + 1).padStart(2, '0')}-${String(_today.getDate()).padStart(2, '0')}`;
const yesterday = `${_yesterday.getFullYear()}-${String(_yesterday.getMonth() + 1).padStart(2, '0')}-${String(_yesterday.getDate()).padStart(2, '0')}`;

// yearweek
const date = new Date();
const currentYear = date.getFullYear();
const _currentWeek = Math.ceil((date - new Date(currentYear, 0, 1)) / (604800000));
const _pastWeek = Math.ceil((date - new Date(currentYear, 0, 1)) / (604800000+(86400000)));
const currentWeek = `${currentYear}${_currentWeek}`;
const pastWeek = `${currentYear}${_pastWeek}`;

// month
const currentMonth = `0${date.getMonth() + 1}`
const pastMonth = `0${date.getMonth()}`

//year

export {
    today,
    yesterday,
    currentWeek,
    pastWeek,
    currentMonth,
    pastMonth,
    currentYear
}