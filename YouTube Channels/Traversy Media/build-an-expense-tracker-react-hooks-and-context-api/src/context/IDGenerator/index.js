import { GenerateRandomValue } from "../../misc/GenerateRandomValue";

// Generate uID
export function guidGenerator(transactions) {
    function _guidGenerator(newID, depth) {
        if (depth > 10000) {
            // TODO: Tratar erro
            alert("Erro ao gerar o ID!");
            return -1;
        }
        for (let transaction of transactions) {
            if (transaction === newID) {
                return _guidGenerator(GenerateRandomValue(), depth += 1)
            }
        }
        return newID;
    }
    const newID = _guidGenerator(GenerateRandomValue(), 0);
    return newID;
}
