import { Users } from "../components/Users";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={10000} />
        <Users />
      </div>
    </div>
  );
};
