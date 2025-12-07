// auth-guard.js
import { auth, onAuthStateChanged } from "./firebase-config.js";

const loginPaths  = ["/login.html", "/signup.html"];
const currentPath = window.location.pathname.toLowerCase();

// Only guard if not login or signup page
if (!loginPaths.some(p => currentPath.endsWith(p))) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Not logged in → send to login
      window.location.href = "login.html";
    }
  });
} else {
  // If on login/signup and already logged in → go home
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "index.html";
    }
  });
}
