# Wedding RSVP Website

A simple and elegant wedding RSVP website that integrates with Google Sheets to collect and manage guest responses.

## Features

- 📝 Simple and clean RSVP form
- 📊 Google Sheets integration for response tracking
- ✨ Form validation and error handling
- 📱 Mobile-responsive design

## Project Structure

```
├── index.html              # Main HTML file with RSVP form
├── styles/
│   └── styles.css         # Core styling and layout
├── scripts/
│   └── google-apps-script.js  # Google Apps Script for form handling
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone this repository
2. Set up Google Apps Script:
   - Create a new Google Apps Script project
   - Create a Google Sheet for storing RSVP responses
   - Copy your Google Sheet ID from the URL (it's the long string between /d/ and /edit in your sheet's URL)
   - Update `SHEET_ID` in [`scripts/google-apps-script.js`](scripts/google-apps-script.js#L4)
   - Deploy the script as a web app
   - Copy the deployed web app URL
   - Update the fetch URL in [`index.html`](index.html#L211) (replace `'GOOGLE_APPS_SCRIPT_WEB_APP_URL'` with the URL from the deployment)
3. Customize the form:
   - Update form fields and labels in `index.html`
   - Modify styles in `styles/styles.css` as needed

## Google Apps Script Integration

The [`google-apps-script.js`](scripts/google-apps-script.js) file contains the server-side code that:
- Handles form submissions
- Validates input data
- Stores responses in a Google Sheet
- Returns success/error messages to the form

## Development

To modify the project:
1. Update the HTML form in [`index.html`](index.html)
2. Modify styles in `styles/styles.css`
3. Adjust the Google Apps Script code as needed for your data collection requirements

## Browser Support

Tested and working in modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Credits

- Confetti animation: [canvas-confetti](https://github.com/catdad/canvas-confetti)
- Fonts: [Google Fonts](https://fonts.google.com/)

