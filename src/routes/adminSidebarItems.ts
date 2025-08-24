import Dashboard from "@/pages/Admin/Dashboard";
import ManageAgent from "@/pages/Admin/ManageAgent";
import ManageSystemConfig from "@/pages/Admin/ManageSystemConfig";
import ManageUser from "@/pages/Admin/ManageUser";
import ViewTransaction from "@/pages/Admin/ViewTransaction";
import { ISidebarItem } from "@/types";


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Dashboard,
      },
      {
        title: "Manage User",
        url: "/admin/manage-user",
        component: ManageUser,
      },
      {
        title: "Manage Agent",
        url: "/admin/manage-agent",
        component: ManageAgent,
      },
      {
        title: "View Transaction",
        url: "/admin/view-transaction",
        component: ViewTransaction,
      },
      {
        title: "Manage System Configuration",
        url: "/admin/manage-system-config",
        component: ManageSystemConfig,
      },
    ],
  },
];
