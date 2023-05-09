import { storage } from "@/pages/firebase";
import { deleteObject, ref } from "firebase/storage";

export function deleteFirebaseImgPath(str) {
	let ibe = str.indexOf('%2F');
	let ila = str.indexOf('?');
	let path = str.slice(ibe + 3, ila);
	const desertRef = ref(storage, `images/${decodeURI(path)}`);
	deleteObject(desertRef);
}
