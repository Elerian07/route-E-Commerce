import { roles } from '../../middleware/auth.js'
export const endpoints = {
    changePassword: [roles.User, roles.Admin],
    deleteUser: [roles.Admin, roles.User],
    updateUser: [roles.Admin, roles.User]
}