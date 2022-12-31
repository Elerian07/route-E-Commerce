import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/User.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
export const roles = {
    User: "User",
    Admin: "Admin"
};
export const auth = (acceptRoles = [roles.User]) => {
    return asyncHandler(async (req, res, next) => {

        console.log({ bb: req.body });
        const { authorization } = req.headers
        console.log({ authorization });
        if (!authorization?.startsWith(process.env.BearerKey)) {
            return next(new Error("In-valid Bearer key", { cause: 400 }))
        } else {
            const token = authorization.split(process.env.BearerKey)[1]
            const decoded = jwt.verify(token, process.env.tokenSignature)
            if (!decoded?.id || !decoded?.isLoggedIn) {
                return next(new Error("In-valid token payload", { cause: 400 }))
            } else {
                const user = await userModel.findById(decoded.id).select('email userName role')
                if (!user) {
                    return next(new Error("Not register user", { cause: 404 }))
                } else {
                    if (acceptRoles.includes(user.role)) {

                        req.user = user
                        return next()
                    } else {
                        return next(new Error("you are not authorized", { cause: 403 }))
                    }

                }
            }
        }
    })
}