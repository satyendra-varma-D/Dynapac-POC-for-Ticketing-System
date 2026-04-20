-- ======================================================
-- SUPPORT AGENT OPERATIONAL FLOW – END TO END SCREENS
-- ======================================================

INSERT INTO figma_make_prompts (screen_name, prompt_text) VALUES

(
'Support_Agent_Operational_Flow',
'Create a complete end-to-end operational flow UI sequence for a Support Agent in a modern SaaS Aftermarket Service System.

Design style:
- Clean SaaS interface
- White and light grey surfaces
- Subtle red accent (#C8102E) for primary buttons and SLA alerts
- 1440px desktop layout
- 12-column grid
- Rounded 12px cards
- Soft shadows
- Modern enterprise look (not ERP style)

Create the following connected screens in sequence:

------------------------------------------------------
1️⃣ Dashboard – Agent View
------------------------------------------------------
Purpose: Agent sees workload instantly.

Include:
- Header with search bar (Ticket / Order / Dealer)
- Notification icon
- Profile dropdown

KPI strip:
- My Open Tickets
- SLA Risk
- Waiting Supplier
- Resolved Today

Main table (agent-filtered view):
Columns:
- Priority indicator
- Ticket ID
- Dealer
- Order Number
- Issue Type
- Status chip
- Supplier ETA
- SLA Countdown
- Last Updated
- View Button

Row highlight for SLA risk (light red background).

------------------------------------------------------
2️⃣ Ticket Opened – Initial View (Before Data Fetch)
------------------------------------------------------
Three-column layout.

LEFT (Conversation Panel):
- Customer message
- Attachments
- Internal notes toggle

CENTER (Order Panel – Empty State):
- Placeholder card saying:
  "Order data not loaded"
- Button: "Fetch Order Details"

Below:
Shipment panel placeholder:
- Button: "Check Shipment"

RIGHT (Action Panel):
- Assign to Self button
- Status dropdown (New, In Progress, Waiting Supplier, Resolved, Closed)
- SLA countdown timer
- Disabled response box (until data fetched)

------------------------------------------------------
3️⃣ Ticket Opened – After SAP & Shipment Fetch
------------------------------------------------------
Same layout but populated.

CENTER:
Order Information Card:
- Order number
- Order status
- Delivery status
- Warehouse stock
- Supplier ETA
- Backorder flag

Shipment Tracking Card:
- Tracking number
- Last scan location
- Estimated delivery

RIGHT:
Active response text area
Primary red button: "Send Response"
Secondary button: "Escalate"
Status dropdown active

------------------------------------------------------
4️⃣ Ticket Status Change Flow
------------------------------------------------------
Create modal design for:
- Escalation confirmation
- Status change confirmation
- SLA breach alert popup

Include warning styles using subtle red background.

------------------------------------------------------
5️⃣ Ticket Closed State
------------------------------------------------------
Show:
- Status: Closed (green chip)
- Conversation locked
- Reopen Ticket button (secondary style)
- Timeline activity log:
  - Ticket created
  - Order fetched
  - Shipment checked
  - Response sent
  - Closed

------------------------------------------------------

Make the entire flow feel smooth, structured, and operationally efficient.
Focus on reducing cognitive load and avoiding clutter.
Design should communicate speed, clarity, and control.'
);