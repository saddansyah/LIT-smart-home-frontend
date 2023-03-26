// Get Today and Yesterday (Y-m-d)
const _today = new Date;
const _yesterday = new Date;
_yesterday.setDate(_yesterday.getDate() - 1);

const today = `${_today.getFullYear()}-${String(_today.getMonth() + 1).padStart(2, '0')}-${String(_today.getDate()).padStart(2, '0')}`
const yesterday = `${_yesterday.getFullYear()}-${String(_yesterday.getMonth() + 1).padStart(2, '0')}-${String(_yesterday.getDate()).padStart(2, '0')}`

export {
    today,
    yesterday
}