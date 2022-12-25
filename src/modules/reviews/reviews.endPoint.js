import { roles } from '../../middleware/auth.js';


export const endpoints = {
    createReview: [roles.User, roles.Admin],
    updateReview: [roles.User, roles.Admin],
    deleteReview: [roles.Admin, roles.User],

}