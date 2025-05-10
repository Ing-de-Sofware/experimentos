import { Injectable } from '@angular/core';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private CLIENT_ID = '1006307415121-okv3p0jnpd684sbfrirtjta9b35urhd6.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyA0GGFqC7od7nqlKH1Cs4eFcl4LkTlrC8U';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar';

  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  constructor() {
    if (typeof gapi !== 'undefined') {
      gapi.load('client:auth2', this.initializeGapiClient.bind(this));
    } else {
      console.warn('GAPI not available');
    }
    this.gisLoaded();
  }

  private async initializeGapiClient() {
    try {
      await gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: this.DISCOVERY_DOCS,
        clientId: this.CLIENT_ID,
        scope: this.SCOPES,
      });
      this.gapiInited = true;
      console.log('GAPI client initialized.');
    } catch (error) {
      console.error('Error initializing GAPI client', error);
    }
  }

  public gisLoaded() {
    if (typeof google === 'undefined') {
      console.warn('Google object not available');
      return;
    }

    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(interval);
        try {
          this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES,
            callback: async (resp) => {
              if (resp.error !== undefined) {
                console.error('OAuth error', resp);
                return;
              }
              const response = await this.scheduleEvent(resp);
              if (response) {
                console.log('Event created: ' + response.htmlLink);
                window.open(response.htmlLink, '_blank');
              }
            },
          });
          this.gisInited = true;
          console.log('GIS client initialized.');
        } catch (error) {
          console.error('Error initializing GIS client', error);
        }
      }
    }, 100);
  }

  public async createGoogleEvent(eventDetails): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.gapiInited || !this.tokenClient) {
          console.warn('Skipping Google event creation: client not initialized');
          resolve(); // No error para no romper frontend
          return;
        }

        this.tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            console.error('Token client error:', resp);
            reject(resp);
            return;
          }

          const response = await this.scheduleEvent(eventDetails);
          if (response) {
            console.log('Event created:', response.htmlLink);
            window.open(response.htmlLink, '_blank');
            resolve();
          } else {
            console.warn('No response from Calendar API');
            resolve(); // Silently ignore
          }
        };

        const promptType = gapi.client.getToken() === null ? 'consent' : '';
        this.tokenClient.requestAccessToken({ prompt: promptType });

      } catch (error) {
        console.error('Error in createGoogleEvent()', error);
        resolve(); // Nunca rechaces si solo es Google OAuth error
      }
    });
  }

  private async scheduleEvent(eventDetails) {
    if (!eventDetails.startTime || !eventDetails.endTime || !eventDetails.email || !eventDetails.summary) {
      console.error('Missing event details');
      return;
    }

    const event = {
      summary: eventDetails.summary,
      start: { dateTime: eventDetails.startTime, timeZone: 'America/Lima' },
      end: { dateTime: eventDetails.endTime, timeZone: 'America/Lima' },
      attendees: [{ email: eventDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 }
        ]
      }
    };

    try {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });
      const response = await request.execute();
      return response;
    } catch (error) {
      console.error('scheduleEvent failed', error);
    }
  }
}
