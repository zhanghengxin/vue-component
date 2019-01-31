export function add (arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let sq1, sq2, m
    try {
        sq1 = arg1.toString().split('.')[1].length
    } catch (e) {
        sq1 = 0
    }
    try {
        sq2 = arg2.toString().split('.')[1].length
    } catch (e) {
        sq2 = 0
    }
    m = Math.pow(10, Math.max(sq1, sq2))
    return (Math.round(arg1 * m) + Math.round(arg2 * m)) / m
}
