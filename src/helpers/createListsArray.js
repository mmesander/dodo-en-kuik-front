// import axios from "axios";
//
// function createListsArray(id, specificList, options) {
//     const isIdPresent = specificList.find((listItem) => {
//         return listItem.id === id;
//     });
//
//     // const listsArray = [...specificList];
//
//     if (isIdPresent) {
//         async function removeListItem(id) {
//             try {
//                 const response = await axios.put(`http://localhost:8088/users/auth/kuikie/movies/favorites`, options);
//                 console.log(response.data)
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//
//         void removeListItem(id);
//     }
// }