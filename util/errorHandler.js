const errorHandler = (error, request, response, next) => {
    console.error("Error", error.message)
    if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = errorHandler
