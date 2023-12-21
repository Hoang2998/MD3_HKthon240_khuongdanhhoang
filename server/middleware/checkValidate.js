const checkValidate = async(req, res, next) => {
    const {email, password} = req.body
    if(email == '' || password == '') {
        return  res.status(400).json({
            message: "Bạn phải điền đầy đủ thông tin",
            type: "error"
        })
    }
    next()
}

module.exports = {
    checkValidate
}