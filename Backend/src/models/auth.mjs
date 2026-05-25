import { user } from "../Schema/Users.mjs";

// export const auth = async ({ nameUser, password, rol, people }) => {
//     try {

//         const newUser = new user({

//             nameUser: nameUser,
//             password: password,
//             rol: rol,
//             peopleid : people

//         })
//         const saveUser = await newUser.save()
//         return { iduser: saveUser._id }

//     }

//     catch (error) {
//         console.error("Error al registrar usuario:", error);
//         throw error;
//     }
// }

export const findOneByAuth = async (nameUser) => {

    const findUser = await user.findOne({ nameUser: nameUser })
        .populate('peopleid')
        .lean()

    if (!findUser) return null
    return findUser
}
