import { roles } from "../../middleware/auth.js"



export const endPoints = {
    updateProduct: [roles.Admin, roles.User],
    addProduct: [roles.Admin, roles.User],
    deleteProduct: [roles.Admin]
}