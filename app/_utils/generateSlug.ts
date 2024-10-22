const generateSlugFromObjectId = (objectId) => {
  const idString = objectId.toString();
  return idString.replace(/(.{4})/g, "$1-").slice(0, -1);
};

export default generateSlugFromObjectId;
