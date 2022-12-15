import { roles } from '../../middleware/auth.js'
export const endpoints = {
    create: [roles.User, roles.Admin],
    remove: [roles.Admin, roles.User],
}