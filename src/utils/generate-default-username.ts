export function generateDefaultUsername(email?: string) {
  // Use a regular expression to match the characters before the first "@" symbol
  if (!email) return "";

  const match = email.match(/^[^@]+/);

  if (match) {
    // Extract the matched part (characters before the "@")
    const username = match[0];

    // Remove any non-alphanumeric characters from the username
    const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, "");

    return cleanUsername;
  }

  // If no match is found, return a default username or handle the case as needed
  return "";
}
