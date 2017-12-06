'use strict'

module.exports = ({ get, post }) => ({
  getProfile: () => get('user/me'),
  getHistory: () => get('user/history'),
  reclaimPoints: amount =>
    post('user/points', { amount: Number(amount) }),
})
