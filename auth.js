// auth.js
import {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "./firebase-config.js";

// Make some helpers available globally (for logout etc.)
window.aiAuth = { auth, signOut };

// ---------- EMAIL LOGIN ----------
const emailLoginBtn = document.getElementById("emailLoginBtn");
if (emailLoginBtn) {
  emailLoginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const msg = document.getElementById("authMessage");

    try {
      msg.textContent = "Signing in...";
      await signInWithEmailAndPassword(auth, email, password);
      location.href = "index.html";
    } catch (err) {
      msg.textContent = err.message || "Login failed";
    }
  });
}

// ---------- EMAIL SIGNUP ----------
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const msg = document.getElementById("authMessage");

    try {
      msg.textContent = "Creating account...";
      await createUserWithEmailAndPassword(auth, email, password);
      location.href = "index.html";
    } catch (err) {
      msg.textContent = err.message || "Signup failed";
    }
  });
}

// ---------- GOOGLE LOGIN ----------
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const msg = document.getElementById("authMessage");
    msg.textContent = "Opening Google...";
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      location.href = "index.html";
    } catch (err) {
      msg.textContent = err.message || "Google login failed";
    }
  });
}

// ---------- GITHUB LOGIN ----------
const githubBtn = document.getElementById("githubLogin");
if (githubBtn) {
  githubBtn.addEventListener("click", async () => {
    const msg = document.getElementById("authMessage");
    msg.textContent = "Opening GitHub...";
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      location.href = "index.html";
    } catch (err) {
      msg.textContent = err.message || "GitHub login failed";
    }
  });
}

// ---------- LOGOUT (used on protected pages) ----------
window.logoutUser = async function () {
  try {
    await signOut(auth);
    location.href = "login.html";
  } catch (err) {
    alert(err.message || "Logout failed");
  }
};
