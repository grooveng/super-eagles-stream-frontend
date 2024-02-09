export function onlyNumberKey(
  evt: React.KeyboardEvent<HTMLInputElement>
): void {
  const { keyCode, ctrlKey } = evt;

  if (
    // Allow delete key (backspace and delete)
    keyCode === 8 || // Backspace
    keyCode === 46 || // Delete
    // Allow arrow keys
    (keyCode >= 37 && keyCode <= 40) || // Arrow keys: left, up, right, down
    // Allow Ctrl+A (select all)
    (keyCode === 65 && ctrlKey)
  ) {
    return;
  }

  const inputChar = String.fromCharCode(keyCode);

  // Regular expression to match only numeric digits
  const numericRegex = /^[0-9]+$/;

  if (!numericRegex.test(inputChar)) {
    evt.preventDefault();
  }
}
