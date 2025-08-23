import { useNavigate } from "react-router";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate("/")}>
      <img
        src="./ePay-logo.png"
        alt="E-Pay Logo Light"
        className="h-30 w-30 block"
      />
    </div>
  );
}
