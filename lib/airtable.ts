// Airtable integration — credentials in .env.local

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// Table names (as created by Airtable AI)
const ORDERS_TABLE = "Orders";
const PROOF_TABLE = "Logo & Proof Workflow";
const COMMS_TABLE = "Printer Communications";

async function airtableRequest(
  method: string,
  table: string,
  path: string,
  body?: object
) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable error: ${error}`);
  }

  return res.json();
}

// ─── Orders ──────────────────────────────────────────────

export type NewOrder = {
  "Customer Name": string;
  "Customer Email": string;
  "Shipping Address"?: string;
  "Product Description": string;
  Size: string;
  Quantity: number;
  "Order Date"?: string;
  Status?: string;
  Source?: string;
  "Order Notes"?: string;
};

export async function createOrder(data: NewOrder) {
  return airtableRequest("POST", ORDERS_TABLE, "", {
    fields: {
      ...data,
      "Order Date": data["Order Date"] || new Date().toISOString().split("T")[0],
      Status: data.Status || "New",
      Source: data.Source || "Website",
      "Order Notes": data["Order Notes"] || "",
    },
  });
}

export async function getOrder(recordId: string) {
  return airtableRequest("GET", ORDERS_TABLE, `/${recordId}`);
}

export async function updateOrder(recordId: string, fields: Partial<NewOrder>) {
  return airtableRequest("PATCH", ORDERS_TABLE, `/${recordId}`, { fields });
}

// ─── Logo & Proof Workflow ────────────────────────────────

export type NewProofWorkflow = {
  Order: string[]; // Airtable linked record — array of Order record IDs
  "Customer Logo Notes"?: string;
  "Logo Submitted Date"?: string;
};

export async function createProofWorkflow(data: NewProofWorkflow) {
  return airtableRequest("POST", PROOF_TABLE, "", {
    fields: {
      ...data,
      "Logo Submitted Date": data["Logo Submitted Date"] || new Date().toISOString().split("T")[0],
    },
  });
}

export async function getProofWorkflow(recordId: string) {
  return airtableRequest("GET", PROOF_TABLE, `/${recordId}`);
}

export async function updateProofWorkflow(
  recordId: string,
  fields: {
    "Customer Decision"?: "Approved" | "Changes Requested";
    "Customer Feedback"?: string;
    "Approval Date"?: string;
  }
) {
  return airtableRequest("PATCH", PROOF_TABLE, `/${recordId}`, { fields });
}

// ─── Printer Communications ───────────────────────────────

export async function logPrinterMessage(data: {
  Order: string[]; // linked record IDs
  Message: string;
  "Sent By": "Us" | "Printer";
  "Response Needed"?: boolean;
}) {
  return airtableRequest("POST", COMMS_TABLE, "", {
    fields: {
      ...data,
      Date: new Date().toISOString().split("T")[0],
    },
  });
}
