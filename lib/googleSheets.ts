// Placeholder for the Google Apps Script Web App URL
// User must replace this with their actual deployed Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxiULftUA-GsKtnHie6mvBXjUfBHdnaMKRbKxPDypvnsExgpf9UWl6jFRIIiZ3GIaTzw/exec"; 

export interface PopupLeadData {
  type: "popup";
  name: string;
  email: string;
  phone: string;
}

export interface ConsultationData {
  type: "consultation";
  name: string;
  email: string;
  phone: string;
  medicine: string;
  message: string;
}

export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderData {
  type: "order";
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    address1: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  orderTotal: number;
}

type SheetData = PopupLeadData | ConsultationData | OrderData;

export const submitToGoogleSheets = async (data: SheetData): Promise<{ success: boolean; message?: string }> => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) {
    console.error("Google Sheets URL not configured. Please set GOOGLE_SCRIPT_URL in lib/googleSheets.ts");
    // Mock success for development if URL is not set, so the UI doesn't break
    return { success: true, message: "Mock success (URL not set)" }; 
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Important for Google Apps Script to avoid CORS errors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // With no-cors, we can't check response.ok or get JSON
    // We assume success if no network error occurred
    return { success: true };
  } catch (error) {
    console.error("Google Sheets Submission Error:", error);
    return { success: false, message: "Network error occurred." };
  }
};
