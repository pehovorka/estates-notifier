import { Collection, db } from "./firebase";
import { Estate } from "./interfaces";

const store = async (estates: Estate[]) => {
  const newOffers: Estate[] = [];

  for (const estate of estates) {
    const estateRef = db.collection(Collection.estates).doc(estate.id);
    const estateDocSnapshot = await estateRef.get();
    if (!estateDocSnapshot.exists) {
      await estateRef.set(estate);
      // newOffers.push(estate);
    }
    // TODO: delete and uncomment line above
    newOffers.push(estate);
  }
  return newOffers;
};

export { store };
