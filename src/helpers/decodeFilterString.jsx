function decodeFilterString(encodedString) {
    // Decode from Base64
    const decodedString = atob(encodedString);

    // Transfer JSON to object
    const data = JSON.parse(decodedString);

    return data;
}

export default decodeFilterString;