import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder="john"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            label={"last Name"}
            placeholder="doe"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            label={"Email"}
            placeholder="akash@email.com"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder="1233345"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onclick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    userName,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>

          <BottomWarning
            label={"already have an account?"}
            buttonText={"sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
