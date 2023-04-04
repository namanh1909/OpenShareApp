
import database from '@react-native-firebase/database';

export const addAddress = async (address, userId) => {
    await database()
        .ref(`/${userId}/address`)
        .push({
            address: address,
        })
        .then(() => console.log('Data set.'));
}

// export const addAddress = async (address) => {
//     await database()
//         .ref(`/contact/`)
//         .push({
//             address: address,
//         })
//         .then(() => console.log('Data set.'));
// }