export async function login(username, password) {
  const res = await fetch(
    `http://localhost:3001/users?username=${username}&password=${password}`
  );
  const users = await res.json();
  if (users.length === 1) {
    // Simpan session ke localStorage
    localStorage.setItem("user", JSON.stringify(users[0]));
    return { success: true, user: users[0] };
  } else {
    return { success: false };
  }
}

export function getUser() {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("user"));
}

export function logout() {
  localStorage.removeItem("user");
}
