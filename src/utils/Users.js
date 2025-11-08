// Obtener todos los usuarios
export function getUsers() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Agregar nuevo usuario
export function addUser(user) {
  const users = getUsers();
  const exists = users.some(u => u.correo === user.correo);
  if (!exists) {
    users.push(user);
    localStorage.setItem("usuarios", JSON.stringify(users));
  }
}

//Actualizar usuario
export function updateUser(updatedUser) {
  const users = getUsers();
  const index = users.findIndex(user => user.correo === updatedUser.correo);

  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem("usuarios", JSON.stringify(users));
  }
}