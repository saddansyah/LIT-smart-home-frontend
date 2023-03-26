// Get Today and Yesterday (Y-m-d)
const _today = new Date();
const _yesterday = new Date();
_yesterday.setDate(_yesterday.getDate() - 1);

// today yesterday
const today = `${_today.getFullYear()}-${String(_today.getMonth() + 1).padStart(2, '0')}-${String(_today.getDate()).padStart(2, '0')}`;
const yesterday = `${_yesterday.getFullYear()}-${String(_yesterday.getMonth() + 1).padStart(2, '0')}-${String(_yesterday.getDate()).padStart(2, '0')}`;

// yearweek
const date = new Date();
const year = date.getFullYear();
const _currentWeek = Math.ceil((date - new Date(year, 0, 1)) / (604800000));
const _pastWeek = Math.ceil((date - new Date(year, 0, 1)) / (604800000+8640000));
const currentWeek = `${year}${_currentWeek}`;
const pastWeek = `${year}${_pastWeek}`;

// month
const currentMonth = `${year}-0${date.getMonth() + 1}`
const pastMonth = `${year}-0${date.getMonth()}`

export {
    today,
    yesterday,
    currentWeek,
    pastWeek,
    currentMonth,
    pastMonth
}