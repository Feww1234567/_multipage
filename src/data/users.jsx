const users = [
  {
    user: "admin",
    pass: "admin123",
    role: "admin",
    token: "admin",
  },
  {
    user: "user",
    pass: "user123",
    role: "user",
    token: "user",
  },
];

export function verifyUser(user, pass) {
  const userTnfo = users.find((u) => {
    return u.user === user && u.pass === pass;
  });

  return userTnfo ? { reole: userTnfo.role, token: userTnfo.token } : null;
}
