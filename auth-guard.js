import { onAuthStateChanged } from "./firebase-config.js";

onAuthStateChanged(aiAuth.auth, user => {
  if (!user) {
    window.location.href = "login.html";
  }
});
