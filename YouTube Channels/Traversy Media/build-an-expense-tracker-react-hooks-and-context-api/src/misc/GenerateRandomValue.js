export function GenerateRandomValue() {
    // Thanks to Riccardo Persiani:
    // Link: https://stackoverflow.com/questions/48006903/react-unique-id-generation
    let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}