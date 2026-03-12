export const db = {
  collection: () => {
    throw new Error("Firestore not initialized");
  },
  doc: () => {
    throw new Error("Firestore not initialized");
  },
};