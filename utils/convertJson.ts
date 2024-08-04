export const convertToObject = (leanDoc: any) => {
  if (!leanDoc) {
    return leanDoc;
  }
  for (const key of Object.keys(leanDoc)) {
    if (leanDoc[key] && leanDoc[key].toJSON) {
      leanDoc[key] = leanDoc[key].toString();
    }
  }
  return leanDoc;
};
