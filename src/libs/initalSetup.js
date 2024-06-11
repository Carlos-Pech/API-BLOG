// import Role from "../models/Roles.js";
// import User from "../models/User.js ";

// export const createRoles = async () => {
//     try {
//         const count = await Role.estimatedDocumentCount();

//         if (count > 0) return;

//         const values = await Promise.all([
//             new Role({ name: "SuperAdmin" }).save(),
//             new Role({ name: "worker" }).save(),
//             new Role({ name: "user" }).save(),
//         ]);
//         console.log("CREATED ROLES");
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const createAdmin = async () => {
//     try {
//         const count = await User.estimatedDocumentCount();
//         if (count > 0) return;

//         const role = await Role.findOne({ name: "SuperAdmin" });
//         const values = await Promise.all([
//             new User({
//                 firstname: "Eduardo",
//                 lastname: "Lopez",
//                 email: "Eduardo.lopez@gmail.com",
//                 password:  await User.encryptPassword("lopezAdmin145"),
//                 phone_number: "9993267971",
//                 id_role: [role._id],
//             }).save(),
//         ]);
//         console.log("CREATE ADMIN");
//     } catch (error) {
//         console.log(error);
//     }
// };

// export async function initializeApp() {
//     await createRoles(), await createAdmin();
// }

