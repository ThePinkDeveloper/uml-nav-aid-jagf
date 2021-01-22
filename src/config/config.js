// =======
// getPort
// =======
const getPort = () => {
    return process.env.PORT || 3000;
}

module.exports = {
    getPort
}