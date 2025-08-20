export const mockLoginApiFetch = (
  email: string,
  password: string
): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password123") {
        resolve({ success: true });
      } else {
        reject(new Error("Invalid email or password."));
      }
    }, 1500);
  });
};
