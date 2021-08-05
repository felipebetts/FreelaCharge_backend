
const treatErrors = (err, req, res, next) => {
    if (err instanceof Error) {
        // se houver algum erro que foi lançado através do throw error
        // retornar com codigo 400 a mensagem lançada
        return res.status(400).json({
            error: err.message
        })
    }

    // havendo algum erro desconhecido do servidor, vamos retornar 500:
    return res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error'
    })
}

module.exports = treatErrors