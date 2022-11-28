import { roles } from '../../middleware/auth.js';


export const endPoints = {
    addSubcategory: [roles.Admin, roles.User],
    deleteSubcategory: [roles.Admin],
    updateSubcategory: [roles.Admin]
}