import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, setPersistence, browserSessionPersistence, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBS2jRmJU224s2EpCEMnwu-CQsIMXo5ZWA",
    authDomain: "qa-authentication-ca01f.firebaseapp.com",
    projectId: "qa-authentication-ca01f",
    storageBucket: "qa-authentication-ca01f.appspot.com",
    messagingSenderId: "84437661572",
    appId: "1:84437661572:web:6f886f3e6798b9dd370fd1",
    measurementId: "G-W7GRSKQWEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("Session persistence set to 'session'");
    })
    .catch((error) => {
        console.error("Error setting session persistence:", error);
    });

// Check if user is logged in on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User is already logged in:", user);
        if (window.location.pathname !== "/home.html") {
            window.location.href = "home.html"; // Redirect to home page if not already there
        }
    } else {
        console.log("❌ No user logged in, redirecting to login.");
        if (window.location.pathname !== "/login.html") {
            window.location.href = "login.html"; // Redirect to login page if user is not signed in
        }
    }
});

// Google Sign-In
document.getElementById("google-login").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("User signed in:", result.user);
            window.location.href = "home.html";
        })
        .catch((error) => {
            console.error("Error during sign-in:", error.code, error.message);
            alert("Failed to sign in. Please try again.");
        });
});
