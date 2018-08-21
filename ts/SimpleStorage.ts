import { AsyncStorage } from "react-native";

const SESSION_ID_KEY = "@TaskReminder:sessionid";

export async function sessionIdIsPresent(): boolean {
  const x = await getSessionId();
  return x !== null;
}

export async function storeSessionId(sessionId: string) {
  await AsyncStorage.setItem(SESSION_ID_KEY, sessionId);
}

export async function getSessionId(): string {
  const value = await AsyncStorage.getItem(SESSION_ID_KEY);
  return value;
}

export async function deleteSessionId() {
  await AsyncStorage.removeItem(SESSION_ID_KEY);
}
