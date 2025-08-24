
import Dashboard from "@/pages/User/Dashboard";
import Deposit from "@/pages/User/Deposit";
import SendMoney from "@/pages/User/SendMoney";
import UserTransaction from "@/pages/User/UserTransaction";
import { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/user/dashboard",
        component: Dashboard,
      },
      {
        title: "Deposit Money",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw",
        component: Deposit,
      },
      {
        title: "Send Money",
        url: "/user/sendMoney",
        component: SendMoney,
      },
      {
        title: "My Transactions",
        url: "/user/transactions",
        component: UserTransaction,
      },
    ],
  },
];
