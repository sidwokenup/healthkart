// ==========================================
// GOOGLE APPS SCRIPT CODE
// Copy and paste this into your Google Apps Script project
// ==========================================

function doPost(e) {
  try {
    // IMPORTANT: Replace "YOUR_SPREADSHEET_ID" with the actual ID from your Google Sheet URL
    // URL format: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
    var sheet = SpreadsheetApp.openById("15SN0jFPnkdNf1cj4qKF0kRcdXFP2UTIGpn3YPrw98nc"); 
    
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // SHEET 1: Popup_Leads
    if (data.type === "popup") {
      var popupSheet = sheet.getSheetByName("Popup_Leads");
      if (!popupSheet) {
        popupSheet = sheet.insertSheet("Popup_Leads");
        popupSheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Source"]);
      }
      popupSheet.appendRow([
        timestamp,
        data.name,
        data.email,
        data.phone,
        "Popup"
      ]);
    }
    
    // SHEET 2: Consultations
    else if (data.type === "consultation") {
      var consultSheet = sheet.getSheetByName("Consultations");
      if (!consultSheet) {
        consultSheet = sheet.insertSheet("Consultations");
        consultSheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Medicine", "Message", "Source"]);
      }
      consultSheet.appendRow([
        timestamp,
        data.name,
        data.email,
        data.phone,
        data.medicine,
        data.message,
        "Consultation"
      ]);
    }
    
    // SHEET 3: Orders
    else if (data.type === "order") {
      var orderSheet = sheet.getSheetByName("Orders");
      if (!orderSheet) {
        orderSheet = sheet.insertSheet("Orders");
        orderSheet.appendRow([
          "Timestamp", "Order ID", "Name", "Email", "Phone", 
          "Address Line 1", "City", "State", "ZIP", 
          "Product Name", "Quantity", "Unit Price", "Total Price", "Order Total", "Source"
        ]);
      }
      
      // Loop through items and add one row per item
      var items = data.items || [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        orderSheet.appendRow([
          timestamp,
          data.orderId,
          data.customer.name,
          data.customer.email,
          data.customer.phone,
          data.address.address1,
          data.address.city,
          data.address.state,
          data.address.zip,
          item.productName,
          item.quantity,
          item.unitPrice,
          item.totalPrice,
          data.orderTotal,
          "Checkout"
        ]);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Ensure GET requests also return something (for browser testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ "status": "running" }))
    .setMimeType(ContentService.MimeType.JSON);
}