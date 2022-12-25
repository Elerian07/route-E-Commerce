import { roles } from '../../middleware/auth.js';


export const endpoints = {
    createOrder: [roles.User, roles.Admin],
    updateOrder: [roles.User, roles.Admin],
    deleteOrder: [roles.Admin, roles.User],

}