<script type="module">
  // Import Firebase SDK from CDN (v10+ modular)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

  // TODO: REPLACE with your real config from Firebase console
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    appId: "YOUR_APP_ID"
  };

  const app  = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Expose auth functions globally so other scripts / inline handlers can use them
  window.aiAuth = {
    auth,
    signUpWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
    logout
  };

  // ----- Email signup -----
  async function signUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // ----- Email login -----
  async function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // ----- Google login -----
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // ----- GitHub login -----
  async function loginWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // ----- Logout -----
  async function logout() {
    return signOut(auth);
  }

  // ----- Auth guard support -----
  // Pages can listen to user changes
  window.aiAuthOnChange = function (callback) {
    onAuthStateChanged(auth, callback);
  };
</script>
