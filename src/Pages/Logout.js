import { auth } from "../config";
import { signOut } from "firebase/auth";

export default async function Logout(setUserJustLoggedout) {
  signOut(auth)
    .then(() => {
      setUserJustLoggedout(true);
      setTimeout(() => {
        setUserJustLoggedout(false);
      }, 5000);
    })
    .catch((error) => {
      alert(error.message);
    });
}
