import { roles } from "../../middleware/auth.js"



export const endPoints = {
    updateCategory: [roles.Admin],
    addCategory: [roles.Admin, roles.User],
    deleteCategory: [roles.Admin]
}