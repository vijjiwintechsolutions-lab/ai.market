import { 
  GoogleAuthProvider, GithubAuthProvider, 
  signInWithPopup, signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase-config.js";

// GOOGLE LOGIN
document.getElementById("googleLoginBtn")?.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(aiAuth.auth, provider)
    .then(() => window.location.href = "index.html")
    .catch(err => alert(err.message));
});

// GITHUB LOGIN
document.getElementById("githubLoginBtn")?.addEventListener("click", () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(aiAuth.auth, provider)
    .then(() => window.location.href = "index.html")
    .catch(err => alert(err.message));
});

// EMAIL SIGNUP
document.getElementById("signupBtn")?.addEventListener("click", () => {
  const email = signupEmail.value;
  const pass = signupPassword.value;

  createUserWithEmailAndPassword(aiAuth.auth, email, pass)
    .then(() => window.location.href = "index.html")
    .catch(err => alert(err.message));
});

// EMAIL LOGIN
document.getElementById("emailLoginBtn")?.addEventListener("click", () => {
  const email = email.value;
  const pass = password.value;

  signInWithEmailAndPassword(aiAuth.auth, email, pass)
    .then(() => window.location.href = "index.html")
    .catch(err => alert(err.message));
});
