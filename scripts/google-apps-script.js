// Google Apps Script to handle form submissions to Google Sheets
// Deploy this as a web app and use the URL in your HTML form

// Set up your Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual Sheet ID
const SHEET_NAME = 'RSVPs'; // The name of the sheet tab to store responses

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log for debugging
    console.log("Received data:", data);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // If the sheet doesn't exist, create it and add headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        'Timestamp', 
        'Name', 
        'Email',
        'Phone',
        'Attending', 
        'Number of Guests',
        'Message'
      ];
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      
      // Format the header row
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#8e9aaf')
        .setFontColor('white')
        .setFontWeight('bold');
    }
    
    // Prepare the row to insert
    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.attending || '',
      data.guests || '',
      data.message || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(row);
    
    // Send success response
    return ContentService.createTextOutput(JSON.stringify({
      'success': true,
      'message': 'RSVP recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    console.error("Error processing RSVP:", error);
    
    // Send error response
    return ContentService.createTextOutput(JSON.stringify({
      'success': false,
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script is working
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'The Wedding RSVP script is active and ready to receive submissions.'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function to create the sheet structure manually if needed
function setupSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (sheet) {
    // Clear existing sheet
    sheet.clear();
  } else {
    // Create new sheet
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Set up headers
  const headers = [
    'Timestamp', 
    'Name', 
    'Email',
    'Phone',
    'Attending', 
    'Number of Guests',
    'Message'
  ];
  
  sheet.appendRow(headers);
  sheet.setFrozenRows(1);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#8e9aaf')
    .setFontColor('white')
    .setFontWeight('bold');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  return "Sheet setup complete!";
}
