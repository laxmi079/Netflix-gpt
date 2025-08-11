/**
 * Validates form inputs for Sign In / Sign Up.
 * 
 * @param {string} email    - User's email address.
 * @param {string} password - User's password.
 * @param {string} [name]   - Optional full name (required for Sign Up).
 * 
 * @returns {string|null}   - Error message if validation fails, otherwise `null`.
 */
export const validateForm = (email, password, name) => {
  // Basic email format validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Email ID is not valid";

  // Password length check (at least 6 characters)
  if (password.length < 6) return "Password must be at least 6 characters long";

  // If name is passed (Sign Up), ensure it is not empty or just spaces
  if (name !== undefined && name.trim() === "") return "Name is required";

  // If all validations pass, return null (no errors)
  return null;
};
