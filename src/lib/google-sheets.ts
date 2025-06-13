declare global {
  interface Window {
    gapi: {
      client: {
        init: (config: {
          apiKey: string;
          discoveryDocs: string[];
          clientId: string;
          scope: string;
        }) => Promise<void>;
        sheets: {
          spreadsheets: {
            create: (params: {
              properties: { title: string };
            }) => Promise<{ result: { spreadsheetId: string } }>;
            values: {
              update: (params: {
                spreadsheetId: string;
                range: string;
                valueInputOption: string;
                resource: { values: any[][] };
              }) => Promise<void>;
            };
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<void>;
        };
      };
      load: (
        api: string,
        callback: () => void
      ) => void;
    };
  }
}

interface SheetData {
  values: any[][];
}

export async function exportToGoogleSheets(data: any[]): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!apiKey || !clientId) {
    throw new Error("Google API credentials are not configured");
  }

  try {
    // Initialize the Google Sheets API
    await window.gapi.client.init({
      apiKey,
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      clientId,
      scope: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Sign in the user
    const auth = await window.gapi.auth2.getAuthInstance();
    if (!auth.isSignedIn.get()) {
      await auth.signIn();
    }

    // Create a new spreadsheet
    const response = await window.gapi.client.sheets.spreadsheets.create({
      properties: {
        title: `News Dashboard Export - ${new Date().toLocaleDateString()}`,
      },
    });

    const spreadsheetId = response.result.spreadsheetId;

    // Convert data to sheet format
    const sheetData: SheetData = {
      values: [
        ["Author", "Articles", "Total Payout"], // Header row
        ...data.map((row) => [row.name, row.articles, row.totalPayout]),
      ],
    };

    // Update the spreadsheet with data
    await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      resource: sheetData,
    });

    // Open the spreadsheet in a new tab
    window.open(
      `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
      "_blank"
    );
  } catch (error) {
    console.error("Error exporting to Google Sheets:", error);
    throw error;
  }
}

export function loadGoogleSheetsAPI(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client:auth2", () => {
        resolve();
      });
    };
    script.onerror = () => reject(new Error("Failed to load Google Sheets API"));
    document.body.appendChild(script);
  });
} 