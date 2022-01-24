const randomAvatar = (() => {
  const numberRandomizer = Math.floor(Math.random() * 100);
  return `https://api.multiavatar.com/${numberRandomizer}.png`
})

module.exports = randomAvatar