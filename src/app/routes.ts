import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import TicketView from "./components/TicketView";
import Login from "./components/Login";
import MyTickets from "./components/MyTickets";
import NotFound from "./components/NotFound";
import SLAManagement from "./components/SLAManagement";
import CustomerLogin from "./components/customer/CustomerLogin";
import CustomerLayoutSidebar from "./components/customer/CustomerLayoutSidebar";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import CustomerTickets from "./components/customer/CustomerTickets";
import CustomerCreateTicket from "./components/customer/CustomerCreateTicket";
import CustomerTrackOrder from "./components/customer/CustomerTrackOrder";
import CustomerTicketDetail from "./components/customer/CustomerTicketDetail";
import CustomerOrders from "./components/customer/CustomerOrders";
import CustomerOrderDetail from "./components/customer/CustomerOrderDetail";
import CustomerDocuments from "./components/customer/CustomerDocuments";
import CustomerSettings from "./components/customer/CustomerSettings";
import CustomerKnowledgeBase from "./components/customer/CustomerKnowledgeBase";
import CustomerAssets from "./components/customer/CustomerAssets";
import CustomerServiceHistory from "./components/customer/CustomerServiceHistory";
import CustomerInvoices from "./components/customer/CustomerInvoices";
import CustomerPartsCatalog from "./components/customer/CustomerPartsCatalog";
import CustomerContracts from "./components/customer/CustomerContracts";
import CustomerNotifications from "./components/customer/CustomerNotifications";
import CustomerAnalytics from "./components/customer/CustomerAnalytics";
import CustomerFeedback from "./components/customer/CustomerFeedback";
import CustomerSupport from "./components/customer/CustomerSupport";

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
    path: "/customer/login",
    Component: CustomerLogin,
  },
  {
    path: "/customer/track-order",
    Component: CustomerTrackOrder,
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
    path: "/customer/orders",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerOrders,
      },
      {
        path: ":orderId",
        Component: CustomerOrderDetail,
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
  {
    path: "/customer/invoices",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerInvoices,
      },
    ],
  },
  {
    path: "/customer/parts-catalog",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerPartsCatalog,
      },
    ],
  },
  {
    path: "/customer/contracts",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerContracts,
      },
    ],
  },
  {
    path: "/customer/notifications",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerNotifications,
      },
    ],
  },
  {
    path: "/customer/analytics",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerAnalytics,
      },
    ],
  },
  {
    path: "/customer/feedback",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerFeedback,
      },
    ],
  },
  {
    path: "/customer/support",
    Component: CustomerLayoutSidebar,
    children: [
      {
        index: true,
        Component: CustomerSupport,
      },
    ],
  },
  // Catch-all route - redirect unknown paths to login
  {
    path: "*",
    Component: NotFound,
  },
]);