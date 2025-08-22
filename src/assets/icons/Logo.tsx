import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img
        src="./ePay-logo.png"
        alt="E-Pay Logo Light"
        className="h-30 w-30 block"
      />
    </Link>
  );
}
