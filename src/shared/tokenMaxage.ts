export const tokenMaxAge = (tokenValue: number, tokenUnit: string) => {
    let tokenMaxAge = 0;
    switch (tokenUnit) {
        case "y": tokenMaxAge = tokenValue * 365 * 24 * 60 * 60 * 1000; break;
        case "M": tokenMaxAge = tokenValue * 30 * 24 * 60 * 60 * 1000; break;
        case "w": tokenMaxAge = tokenValue * 7 * 24 * 60 * 60 * 1000; break;
        case "d": tokenMaxAge = tokenValue * 24 * 60 * 60 * 1000; break;
        case "h": tokenMaxAge = tokenValue * 60 * 60 * 1000; break;
        case "m": tokenMaxAge = tokenValue * 60 * 1000; break;
        case "s": tokenMaxAge = tokenValue * 1000; break;
        default: tokenMaxAge = 1000 * 60 * 60;
    }
    return tokenMaxAge;
};
