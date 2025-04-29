import { Injectable } from '@angular/core';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private CLIENT_ID = '622160902930-h5hbenlmfus5nba0oebt9pr0jr3hmavl.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyCo6YYZcodZ0kj3PvhAtV-rPFlRjs5vgNs';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar';

  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;
  private google: any;


  constructor() {
    gapi.load('client:auth2', this.initializeGapiClient.bind(this));
    this.gisLoaded();
  }
  private async initializeGapiClient() {
    try {
      await gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      });
      this.gapiInited = true;
      console.log('GAPI client initialized.');
    } catch (error) {
      console.error('Error initializing GAPI client', error);
    }
  }
// GoogleCalendarService.ts
  public gisLoaded() {
    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(interval);
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: this.CLIENT_ID,
          scope: this.SCOPES,
          callback: async (resp) => {
            if (resp.error !== undefined) {
              throw resp;
            }
            const response = await this.scheduleEvent(resp);
            if (response) {
              console.log('Event created: ' + response.htmlLink);
              window.open(response.htmlLink, '_blank'); // Abre el evento en una nueva pestaña
            } else {
              console.error('No response from Google Calendar API');
            }
          },
        });
        this.gisInited = true;
        console.log('GIS client initialized.');
      }
    }, 100);
  }

  public async createGoogleEvent(eventDetails): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.gapiInited) {
          console.log('GAPI client not initialized. Initializing...');
          await this.initializeGapiClient();
        }
        if (!this.gisInited) {
          console.log('GIS client not initialized. Initializing...');
          this.gisLoaded();
        }
        if (!this.tokenClient) {
          throw new Error('tokenClient is not initialized');
        }
        if (!gapi.client) {
          throw new Error('gapi.client is not initialized');
        }

        this.tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw resp;
          }
          const response = await this.scheduleEvent(eventDetails);
          if (response) {
            console.log('Event created: ' + response.htmlLink);
            resolve();
            window.open(response.htmlLink, '_blank'); // Abre el evento en una nueva pestaña
          } else {
            console.error('No response from Google Calendar API');
            reject();
          }
        };

        if (gapi.client.getToken() === null) {
          this.tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          this.tokenClient.requestAccessToken({prompt: ''});
        }
      } catch (error) {
        console.error('Error creating Google event', error);
        reject(error);
      }
    });
  }

  private async scheduleEvent(eventDetails) {
    if (!eventDetails.startTime || !eventDetails.endTime || !eventDetails.email || !eventDetails.summary) {
      console.error('Event details are missing required fields');
      return;
    }

    const event = {
      summary: eventDetails.summary,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: "America/Lima",
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: "America/Lima",
      },
      attendees: [{ email: eventDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    console.log('Event to be created:', event);

    try {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        timeZone: "America/Lima",
      });
      const response = await request.execute();
      return response;

    } catch (error) {
      console.error('Error creating event', error);
      if (error.result) {
        console.error('Error details:', error.result.error);
      }
      if (error.body) {
        console.error('Error body:', error.body);
      }
    }
  }
}
