import { roles } from '../../middleware/auth.js';

export const endPoints = {
    addBrand: [roles.Admin, roles.User],
    updatedBrand: roles.Admin,
    deleteBrand: roles.Admin,
    findBrand: [roles.Admin, roles.User]
}