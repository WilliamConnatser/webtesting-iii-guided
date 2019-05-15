const post = (path, payload) => {
    return new Promise((resolve, reject) => {
        if (payload === undefined || payload.password === undefined) reject({
            success: false,
            statusCode: 422,
            message: 'Enter a password'
        })
        else if (payload.password === 'mellon') resolve({
            success: true,
            statusCode: 200
        })
        else reject({
            success: false,
            statusCode: 401,
            message: 'Invalid credentials'
        })
    });

}
module.exports = {
    post
}