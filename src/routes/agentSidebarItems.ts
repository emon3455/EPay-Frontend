import { ISidebarItem } from "@/types";
import AgentDashboard from "@/pages/Agent/AgentDashboard";
import AgentAddMoney from "@/pages/Agent/AgentAddMoney";
import AgentWithdraw from "@/pages/Agent/AgentWithdraw";
import AgentTransaction from "@/pages/Agent/AgentTransaction";
import AgentComission from "@/pages/Agent/AgentComission";


export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        component: AgentDashboard,
      },
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AgentAddMoney,
      },
      {
        title: "Withdraw Money",
        url: "/agent/withdraw-money",
        component: AgentWithdraw,
      },
      {
        title: "My Transactions",
        url: "/agent/my-transactions",
        component: AgentTransaction,
      },
      {
        title: "My Comission",
        url: "/agent/my-comission",
        component: AgentComission,
      },
    ],
  },
];
