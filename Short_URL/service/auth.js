const sessionIdToUserMap = new Map();

function setUser(id, user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    return sessionIsUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}