import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import TicketView from "./components/TicketView";
import Login from "./components/Login";
import MyTickets from "./components/MyTickets";
import KnowledgeBase from "./components/KnowledgeBase";
import NotFound from "./components/NotFound";
import SLAManagement from "./components/SLAManagement";
import CustomerLogin from "./components/customer/CustomerLogin";
import CustomerLayoutSidebar from "./components/customer/CustomerLayoutSidebar";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import CustomerTickets from "./components/customer/CustomerTickets";
import CustomerCreateTicket from "./components/customer/CustomerCreateTicket";
import CustomerTicketDetail from "./components/customer/CustomerTicketDetail";
import CustomerDocuments from "./components/customer/CustomerDocuments";
import CustomerSettings from "./components/customer/CustomerSettings";
import CustomerKnowledgeBase from "./components/customer/CustomerKnowledgeBase";
import CustomerAssets from "./components/customer/CustomerAssets";
import CustomerServiceHistory from "./components/customer/CustomerServiceHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "ticket/:ticketId",
        Component: TicketView,
      },
    ],
  },
  {
    path: "/my-tickets",
    Component: Layout,
    children: [
      {
        index: true,
        Component: MyTickets,
      },
    ],
  },
  {
    path: "/sla",
    Component: Layout,
    children: [
      {
        index: true,
        Component: SLAManagement,
      },
    ],
  },
  {
    path: "/knowledge-base",
    Component: Layout,
    children: [
      {
        index: true,
        Component: KnowledgeBase,
      },
    ],
  },
  {
    path: "/customer/login",
    Component: CustomerLogin,
  },

  {
    path: "/customer/dashboard",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerDashboard,
      },
    ],
  },
  {
    path: "/customer/create-ticket",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerCreateTicket,
      },
    ],
  },
  {
    path: "/customer/tickets",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerTickets,
      },
      {
        path: ":ticketId",
        Component: CustomerTicketDetail,
      },
    ],
  },

  {
    path: "/customer/documents",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerDocuments,
      },
    ],
  },
  {
    path: "/customer/settings",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerSettings,
      },
    ],
  },
  {
    path: "/customer/knowledge-base",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerKnowledgeBase,
      },
    ],
  },

  {
    path: "/customer/assets",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerAssets,
      },
    ],
  },
  {
    path: "/customer/service-history",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerServiceHistory,
      },
    ],
  },




  // Catch-all route - redirect unknown paths to login
  {
    path: "*",
    Component: NotFound,
  },
]);