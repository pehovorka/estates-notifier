import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

enum Collection {
  estates = "estates",
}

export { admin, db, Collection };
