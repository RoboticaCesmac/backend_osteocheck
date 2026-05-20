export function randomCodeGenerator(length: number) {
    const safeLoopExit = 10;
    let a = Math.random().toString(36).substring(2, length + 2);
    let loopCount = 0;
    while (a.length < length) {
        a += Math.random().toString(36).substring(0, length - a.length);
        loopCount += 1;
        if (loopCount === safeLoopExit) {
            break;
        }
    }
    return a;
}