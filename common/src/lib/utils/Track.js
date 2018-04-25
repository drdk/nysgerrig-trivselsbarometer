export default class Track {
    // only supports simple tracking (string events)
    constructor() {
        if (this.isTrackingEnabled()) {
            this.adobeAnalytics = window.Bootstrapper; //Adobe Analytics
        }
    }

    pageView() {
        if (this.isTrackingEnabled()) {
        if (window.trivselPageView !== undefined) {
            return;
        }
        window.trivselPageView = true;
        try {
            this.adobeAnalytics.ensEvent.trigger("skole-trivsel");
            console.log("pageView");
        } catch (e) {
            console.log("Could not track pageview");
        }
    }
    }

    send(event){
        if (this.isTrackingEnabled()) {
        try {
            this.adobeAnalytics.ensEvent.trigger("skole-trivsel", event);
        } catch (e) {
            console.log("Could not track event");
        }
    }
    }

    isTrackingEnabled() {
        return window.location.host.includes('dr.dk')
    }
}