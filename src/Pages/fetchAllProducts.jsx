import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const categories = [
  "Accessories",
  "Back to school",
  "Cloths",
  "Home",
  "Kids",
  "Men",
  "New",
  "Shoes",
  "Woman"
];

export const fetchAllProducts = async () => {
  const allProducts = [];

  for (const category of categories) {
    const categoryRef = collection(db, `products/${category}/products`);
    const snapshot = await getDocs(categoryRef);

    snapshot.forEach((doc) => {
      const data = doc.data();
      allProducts.push({ ...data, id: data.id, category });
    });
  }

  return allProducts;
};
