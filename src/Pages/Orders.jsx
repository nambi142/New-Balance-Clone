import React, { useState, useEffect } from "react";
import {
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Pages/firebase.jsx";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../Css/Orders.css";
import { useStore } from "../Contaxt/Store";

const Orders = () => {
  const [activeSection, setActiveSection] = useState("orders");

  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { userInfo, setUser, setUserInfo } = useStore();
  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserInfo({ uid: currentUser.uid, ...data });
      }
    };
    fetchUserInfo();
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserInfo(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");

    navigate("/Login", { replace: true }); 
  };

  const openModal = (type) => {
    setErrorMsg("");
    setModalType(type);
    if (userInfo) setFormData({ ...userInfo });
  };

  const closeModal = () => {
    setModalType(null);
    setPasswordData({ current: "", newPass: "", confirm: "" });
    setErrorMsg("");
  };

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const saveUserData = async (fields) => {
    if (!userInfo?.uid) return;
    try {
      await updateDoc(doc(db, "users", userInfo.uid), fields);
      setUserInfo((prev) => ({ ...prev, ...fields }));
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMsg("Failed to update.");
    }
  };

  const savePasswordChange = async () => {
    const { current, newPass, confirm } = passwordData;
    if (newPass !== confirm) return setErrorMsg("Passwords don't match");

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        current
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPass);
      setErrorMsg("");
      closeModal();
    } catch (err) {
      console.error(err);
      setErrorMsg("Wrong current password or weak new password.");
    }
  };

  const deleteAddress = async () => {
    await updateDoc(doc(db, "users", userInfo.uid), { address: "" });
    setUserInfo((prev) => ({ ...prev, address: "" }));
  };

  return (
    <div className="my-account">
      <div className="side-column">
        <div onClick={() => setActiveSection("orders")}>Orders</div>
        <div onClick={() => setActiveSection("personal")}>Personal details</div>
        <div onClick={() => setActiveSection("payments")}>Payments</div>
        <div onClick={() => setActiveSection("addresses")}>Addresses</div>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <div className="mani-place">
        {activeSection === "orders" && (
          <div className="orders">
            <h1>Orders</h1>
            <p>You haven’t placed any orders yet.</p>
          </div>
        )}

        {activeSection === "personal" && (
          <div className="Personal-details">
            <h1>Personal details</h1>
            <div>
              <h2>Details</h2>
              <p>
                {userInfo?.firstname} {userInfo?.lastname}
              </p>
              <p>Phone: {userInfo?.phone || "N/A"}</p>
              <p>DOB: {userInfo?.dob || "N/A"}</p>
              <button onClick={() => openModal("name")}>Edit</button>
            </div>
            <div>
              <h2>Login email</h2>
              <p>{userInfo?.email}</p>
              <button onClick={() => openModal("email")}>Edit</button>
            </div>
            <div>
              <h2>Password</h2>
              <p>********</p>
              <button onClick={() => openModal("password")}>
                Change Password
              </button>
            </div>
          </div>
        )}

        {activeSection === "payments" && (
          <div className="Payments">
            <h1>Payments</h1>
            <p>No payment method added.</p>
          </div>
        )}

        {activeSection === "addresses" && (
          <div className="Addresses">
            <h1>Shipping Address</h1>
            <p>{userInfo?.address || "No address saved yet."}</p>
            <button onClick={() => openModal("address")}>
              {userInfo?.address ? "Edit Address" : "Add Address"}
            </button>
            {userInfo?.address && (
              <button
                onClick={deleteAddress}
                style={{ marginTop: "8px", color: "white" }}
              >
                Delete Address
              </button>
            )}
          </div>
        )}
      </div>

      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            {modalType === "name" && (
              <>
                <h2>Edit Personal Details</h2>
                <input
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleFormChange}
                />
                <input
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleFormChange}
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
                <input
                  name="dob"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleFormChange}
                />
                <p className="error">{errorMsg}</p>
                <button
                  onClick={() =>
                    saveUserData({
                      firstname: formData.firstname,
                      lastname: formData.lastname,
                      phone: formData.phone,
                      dob: formData.dob,
                    })
                  }
                >
                  Save
                </button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}

            {modalType === "email" && (
              <>
                <h2>Edit Email</h2>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
                <p className="error">{errorMsg}</p>
                <button onClick={() => saveUserData({ email: formData.email })}>
                  Save
                </button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}

            {modalType === "password" && (
              <>
                <h2>Change Password</h2>
                <input
                  name="current"
                  placeholder="Current Password"
                  type="password"
                  value={passwordData.current}
                  onChange={handlePasswordChange}
                />
                <input
                  name="newPass"
                  placeholder="New Password"
                  type="password"
                  value={passwordData.newPass}
                  onChange={handlePasswordChange}
                />
                <input
                  name="confirm"
                  placeholder="Confirm New Password"
                  type="password"
                  value={passwordData.confirm}
                  onChange={handlePasswordChange}
                />
                <p className="error">{errorMsg}</p>
                <button onClick={savePasswordChange}>Save</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}

            {modalType === "address" && (
              <>
                <h2>{userInfo?.address ? "Edit Address" : "Add Address"}</h2>
                <textarea
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleFormChange}
                />
                <p className="error">{errorMsg}</p>
                <button
                  onClick={() => saveUserData({ address: formData.address })}
                >
                  Save
                </button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
