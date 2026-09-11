import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { useNavigate, useLocation } from "react-router-dom";

import {
  Mail,
  Lock,
  Loader2,
  User,
  Truck,
  ArrowRight,
  Chrome,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("individual");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    setIsLogin(location.pathname !== "/register");
  }, [location.pathname]);

  useEffect(() => {
    if (!message.text) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const showError = (text) => {
    setMessage({
      type: "error",
      text: text,
    });
  };

  const showSuccess = (text) => {
    setMessage({
      type: "success",
      text: text,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const getFirebaseErrorMessage = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Email or password is incorrect.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/email-already-in-use":
        return "This email is already registered.";

      case "auth/weak-password":
        return "Password must be at least 6 characters.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/popup-closed-by-user":
        return "Google login was cancelled.";

      case "auth/popup-blocked":
        return "Your browser blocked the Google login popup.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      case "auth/operation-not-allowed":
        return "This login method is not enabled in Firebase.";

      default:
        return error.message || "Something went wrong.";
    }
  };

  const getPartnerProfile = async (firebaseUser) => {
    const partnerQuery = query(
      collection(db, "partner_profiles"),
      where("Firebase_UID", "==", firebaseUser.uid)
    );

    const partnerSnapshot = await getDocs(partnerQuery);

    if (partnerSnapshot.empty) {
      return null;
    }

    const partnerData = partnerSnapshot.docs[0].data();

    return {
      ...partnerData,
      role: "vendor",
      status:
        String(partnerData.Partner_Status || "").toLowerCase() === "active"
          ? "active"
          : "pending",
    };
  };

  const checkUserProfile = async (firebaseUser) => {
    const userReference = doc(db, "users", firebaseUser.uid);
    const userSnapshot = await getDoc(userReference);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    }

    return await getPartnerProfile(firebaseUser);
  };

  const redirectUser = (userData) => {
    if (!userData) {
      showError("User profile not found.");
      return;
    }

    if (userData.role === "vendor") {
      navigate("/vendor-dashboard", {
        state: {
          partnerData: userData,
        },
      });

      return;
    }

    if (userData.role === "individual") {
      navigate("/customer-dashboard");
      return;
    }

    showError("Invalid account type.");
  };

  const handleEmailLogin = async () => {
    if (!formData.email || !formData.password) {
      showError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      const userData = await checkUserProfile(result.user);

      if (!userData) {
        await signOut(auth);
        showError("User profile not found. Please contact support.");
        return;
      }

      if (userData.role !== role) {
        await signOut(auth);

        const accountType =
          userData.role === "vendor"
            ? "Vendor / Partner"
            : "Individual";

        showError(
          `This account is registered as ${accountType}.`
        );

        return;
      }

      redirectUser(userData);
    } catch (error) {
      console.error("Email Login Error:", error);
      showError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const existingProfile = await checkUserProfile(firebaseUser);

      if (existingProfile) {
        if (existingProfile.role !== role) {
          await signOut(auth);

          const accountType =
            existingProfile.role === "vendor"
              ? "Vendor / Partner"
              : "Individual";

          showError(
            `This Google account is already registered as ${accountType}.`
          );

          return;
        }

        redirectUser(existingProfile);
        return;
      }

      const userData = {
        uid: firebaseUser.uid,
        role: role,
        status: role === "vendor" ? "pending" : "active",
        fullName: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        phone: firebaseUser.phoneNumber || "",
        photoURL: firebaseUser.photoURL || "",
        provider: "google",
        createdAt: new Date().toISOString(),
      };

      await setDoc(
        doc(db, "users", firebaseUser.uid),
        userData
      );

      if (role === "vendor") {
        await signOut(auth);

        showSuccess(
          "Google account created. Vendor verification is pending."
        );

        return;
      }

      navigate("/customer-dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);
      showError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password
    ) {
      showError("Please fill all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      const user = result.user;

      const userData = {
        uid: user.uid,
        role: role,
        status: role === "vendor" ? "pending" : "active",
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        provider: "password",
        createdAt: new Date().toISOString(),
      };

      await setDoc(
        doc(db, "users", user.uid),
        userData
      );

      await signOut(auth);

      if (role === "vendor") {
        showSuccess(
          "Vendor registration successful. Your account is pending verification."
        );
      } else {
        showSuccess(
          "Account created successfully. Please login."
        );
      }

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error);
      showError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!resetEmail) {
      showError("Please enter your registered email.");
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(
        auth,
        resetEmail.trim()
      );

      alert(
        "Password reset link has been sent to your email. Please check Inbox / Spam."
      );

      setResetEmail("");
      setShowResetModal(false);
    } catch (error) {
      console.error("Password Reset Error:", error);
      alert(getFirebaseErrorMessage(error));
    } finally {
      setResetLoading(false);
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    if (isLogin) {
      await handleEmailLogin();
    } else {
      await handleRegister();
    }
  };

  const roles = [
    {
      id: "individual",
      label: "Individual",
      icon: <User size={18} />,
    },
    {
      id: "vendor",
      label: "Vendor / Partner",
      icon: <Truck size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center p-4 py-12 font-sans">
      <div className="bg-white w-full max-w-[550px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100">

        <div className="pt-10 pb-7 px-8 text-center">
          <div className="w-16 h-1 bg-indigo-600 mx-auto mb-6 rounded-full" />

          <h2 className="text-[#1e293b] text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="text-slate-500 text-sm mt-2 font-medium">
            {isLogin
              ? "Login to your Apni Manzil account"
              : "Start your logistics journey"}
          </p>
        </div>

        <div className="px-8 pb-10">

          <div className="mb-7">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Account Type
            </p>

            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
              {roles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRole(item.id);
                    setMessage({
                      type: "",
                      text: "",
                    });
                  }}
                  className={
                    "flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 " +
                    (role === item.id
                      ? "bg-white shadow-sm text-indigo-600 font-bold"
                      : "text-slate-500 hover:text-slate-700")
                  }
                >
                  {item.icon}

                  <span className="text-xs uppercase tracking-wider">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {message.text && (
            <div
              className={
                "mb-5 p-4 rounded-xl text-xs font-bold text-center " +
                (message.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600")
              }
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleAuth}
            className="space-y-4"
          >

            {!isLogin && (
              <>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:border-indigo-600"
                  />
                </div>

                <div className="relative">
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:border-indigo-600"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:border-indigo-600"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:border-indigo-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-indigo-600 transition-all flex justify-center items-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            {isLogin && (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="h-px bg-slate-200 flex-1" />

                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    OR
                  </span>

                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex justify-center items-center gap-3 disabled:opacity-60"
                >
                  <Chrome size={19} />
                  Continue with Google
                </button>
              </>
            )}
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage({
                  type: "",
                  text: "",
                });
              }}
              className="text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-indigo-600"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-5">
              <h3 className="text-slate-800 text-2xl font-bold">
                Reset Password
              </h3>

              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-slate-500 text-sm mb-6">
              Enter your registered email address. We will send you a password reset link.
            </p>

            <form
              onSubmit={handleResetPassword}
              className="space-y-4"
            >
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="email"
                  required
                  placeholder="Registered Email"
                  value={resetEmail}
                  onChange={(event) =>
                    setResetEmail(event.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm flex justify-center disabled:opacity-60"
              >
                {resetLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="w-full text-slate-400 text-xs font-bold uppercase pt-2"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;