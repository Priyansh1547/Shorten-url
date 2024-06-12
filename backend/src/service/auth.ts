const sessionIdToUserMap = new Map();

export function setUser(id: any, user: any) {
  sessionIdToUserMap.set(id, user);
}

export function getUser(id: any) {
  return sessionIdToUserMap.get(id);
}
