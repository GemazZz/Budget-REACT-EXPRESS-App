import { useState } from "react";
import {
  StyledDiv,
  StyledCloseBtn,
  StyledTransactionH1,
  StyledDateLabel,
  StyledSubmitBtn,
  StyledAmountLabel,
  StyledDateInput,
  StyledNumberInput,
} from "../styles/signStyle";
import { Link, useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api/v1/newpassword";

const ForgetPass = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const userData = { password, newPassword };
  const navigate = useNavigate();

  const newPassSet = () => {
    if (password.length < 6) {
      alert("Password is NOT valid. (Use at least 6 character)");
      return;
    }
    if (password.length > 20) {
      alert("Password is NOT valid. (Use no more than 20 character)");
      return;
    }
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    alert("Password changed successfully");
    navigate("/signin");
  };
  return (
    <StyledDiv>
      <Link to={"/"}>
        <StyledCloseBtn>
          <i className="fa-solid fa-xmark fa-2xl" style={{ color: "#764920" }} />
        </StyledCloseBtn>
      </Link>
      <StyledTransactionH1>Change Password </StyledTransactionH1>
      <div style={{ position: "relative", left: "-5px" }}>
        <StyledDateLabel htmlFor="Email">Old Password: </StyledDateLabel>
        <StyledDateInput
          type="email"
          id="Email"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div style={{ position: "relative", left: "3.5px" }}>
        <StyledAmountLabel htmlFor="amount">New Password: </StyledAmountLabel>
        <StyledNumberInput
          type="password"
          id="amount"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </div>
      <StyledSubmitBtn
        className="submit"
        onClick={() => {
          newPassSet();
        }}
      >
        Update
      </StyledSubmitBtn>
    </StyledDiv>
  );
};

export default ForgetPass;
