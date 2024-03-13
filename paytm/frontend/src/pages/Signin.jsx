import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeholder="akash@email.com"
            onchange={(e) => {
              setUsername(e.target.vale);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder=""
            onchange={(e) => {
              setPassword(e.target.vale);
            }}
          />
          <div className="pt-4">
            <Button
              onclick={() => {
                axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
              }}
              label={"Sign in"}
            />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
