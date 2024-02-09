export const validateFileType = (filename: any) => {
  var parts = filename.split(".");
  parts[parts.length - 1];
  switch (parts[1].toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
    case "png":
      return true;
  }
  return false;
};
