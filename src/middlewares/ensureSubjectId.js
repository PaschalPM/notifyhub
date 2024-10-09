/**
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 * @returns 
 */
function ensureSubjectId(req, res, next) {
    const subjectId = req.body?.subjectId

    if (subjectId === undefined) {
        return res.status(400).json({
            "status": "error",
            "message": "Subject ID must be set"
        })
    }
    if (isNaN(subjectId)) {
        return res.status(400).json({
            "status": "error",
            "message": "Subject ID must be numeric"
        })
    }
    req.subjectId = subjectId
    next()
}

export default ensureSubjectId