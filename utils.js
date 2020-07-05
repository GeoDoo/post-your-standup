const btoa = (user, token) => Buffer.from(`${user}:${token}`).toString('base64')

module.exports = { btoa }
