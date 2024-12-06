export const getAllUsers = async () => {
  return await fetch("/api/users").then((res) => res.json());
};
