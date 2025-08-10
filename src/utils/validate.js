export const validateForm = (email, password, name) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Email ID is not valid";

  if (password.length < 6) return "Password must be at least 6 characters long";

  if (name !== undefined && name.trim() === "") return "Name is required";

  return null;
};
