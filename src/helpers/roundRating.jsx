function roundRating(rating) {
    const number = parseFloat(rating);
    return Number(number.toFixed(1));
}

export default roundRating;