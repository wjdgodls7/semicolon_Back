export const isAuthenticated = (request) => {
    if (!request.user) {
        throw Error("로그인을 먼저 해주세요! 😁");        
    }
    return;
}