const errorHandler = (error, request, response, next) => {
    console.error("Error", error.message)
    if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeValidationError') {
        return response.status(400).end()
    }
    next(error)
}

module.exports = errorHandler
