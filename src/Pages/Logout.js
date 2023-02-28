import { auth } from "../config";
import { signOut } from "firebase/auth";

export default async function Logout() {
  signOut(auth)
    .then(() => {
      alert("User Logged Out");
    })
    .catch((error) => {
      alert(error.message);
    });
}
