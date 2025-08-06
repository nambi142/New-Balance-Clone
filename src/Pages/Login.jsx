import React, { useState, useMemo } from "react";
import "../Css/Login.css";
import { MdLocalShipping } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { auth, db } from "../Pages/firebase.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../Contaxt/Store";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/Orders";
  const { setUser } = useStore();

  const [activeTab, setActiveTab] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    passcode: "",
    firstname: "",
    lastname: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordRules = useMemo(
    () => ({
      minLength: formData.passcode.length >= 8,
      capital: /[A-Z]/.test(formData.passcode),
      number: /[0-9]/.test(formData.passcode),
      specialChar: /[@#$%&*]/.test(formData.passcode),
      noCommon: !/^(password|123456|qwerty|yourname|email)$/i.test(
        formData.passcode
      ),
      noRepeats: !/(.)\1\1/.test(formData.passcode),
    }),
    [formData.passcode]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, passcode, firstname, lastname } = formData;

    if (!email || !passcode) return alert("Email and password are required.");

    try {
      if (activeTab === "CreateAccount") {
        if (!firstname.trim() || !lastname.trim()) {
          return alert("First and Last names are required.");
        }

        if (!passwordRules.minLength)
          return alert("Password must be at least 8 characters.");
        if (!passwordRules.capital)
          return alert("Password must contain at least one capital letter.");
        if (!passwordRules.number)
          return alert("Password must contain at least one number.");
        if (!passwordRules.specialChar)
          return alert("Password must contain at least one special character.");
        if (!passwordRules.noCommon)
          return alert("Password cannot be a common word or phrase.");
        if (!passwordRules.noRepeats)
          return alert("Password cannot contain three repeating characters.");

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          passcode
        );
        const user = userCredential.user;

        const userInfo = {
          firstname,
          lastname,
          email,
          password: passcode,
        };

        await setDoc(doc(db, "users", user.uid), userInfo);

        alert("Account created successfully!");
        setActiveTab("Login");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          passcode
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userInfo = userDoc.data();

          localStorage.setItem("user", JSON.stringify(userInfo));
          setUser(userInfo);
          alert(`Welcome back, ${userInfo.firstname}!`);

          const from = "/Orders";
          navigate("/Orders", { replace: true });
        }
      }

      // Reset form only after successful action
      setFormData({ email: "", passcode: "", firstname: "", lastname: "" });
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("This email is already registered. Please log in instead.");
          setActiveTab("Login");
          break;
        case "auth/invalid-email":
          alert("Invalid email address format.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password.");
          break;
        case "auth/user-not-found":
          alert("No user found with this email.");
          break;
        default:
          alert(error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="shipping">
        <MdLocalShipping className="van" />
        <p>Free shipping for members.</p>
      </div>

      <div className="account">
        {["Login", "CreateAccount"].map((tab) => (
          <button
            key={tab}
            className={`tab-account ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Login" ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="passcode"
              placeholder="Password"
              value={formData.passcode}
              onChange={handleChange}
              required
            />
            <span
              className={`toggle-password ${showPassword ? "active" : ""}`}
              onClick={togglePasswordVisibility}
            >
              <IoEye />
            </span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a href="#">
              <p>Forgot password</p>
            </a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      ) : (
        <form className="create-account-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="passcode"
              placeholder="Password"
              value={formData.passcode}
              onChange={handleChange}
              required
            />
            <span
              className={`toggle-password ${showPassword ? "active" : ""}`}
              onClick={togglePasswordVisibility}
            >
              <IoEye />
            </span>
          </div>

          <div className="password-rules">
            <p>
              <strong>Password requirements:</strong>
            </p>
            <ul>
              <li className={passwordRules.minLength ? "valid" : ""}>
                Minimum 8 characters
              </li>
              <li className={passwordRules.capital ? "valid" : ""}>
                At least one capital letter
              </li>
              <li className={passwordRules.number ? "valid" : ""}>
                At least one number
              </li>
              <li className={passwordRules.specialChar ? "valid" : ""}>
                At least one special character (@ # $ % & *)
              </li>
              <li className={passwordRules.noCommon ? "valid" : ""}>
                No common names or emails
              </li>
              <li className={passwordRules.noRepeats ? "valid" : ""}>
                No repeating characters
              </li>
            </ul>
          </div>

          <div className="signup-email">
            <label>
              <input type="checkbox" />
              Sign up for email to hear about product launches, exclusive offers
              and athlete news
            </label>
          </div>

          <button type="submit" className="create-btn">
            Create Account
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
