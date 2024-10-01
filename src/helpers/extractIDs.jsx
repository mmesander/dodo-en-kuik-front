function extractIDs(genreString) {

    if (!genreString || !genreString.includes("&with_genres=")) {
        return []; // Return een lege array als er geen valide input is
    }

    // Deze pakt het gedeelte na with_genres=
    let idsPart = genreString.split("&with_genres=")[1]

    // // Controleer of idsPart bestaat en niet null of undefined is
    // if (!idsPart || !idsPart.includes("%2C")) {
    //     return []; // Return een lege array als de IDs niet gesplitst kunnen worden
    // }

    // Deze split de ID's achter %2C en zet de string om naar een int
    return idsPart.split("%2C").map(Number);
}

export default extractIDs;