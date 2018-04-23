export default class Track {
    // only supports simple tracking (string events)
    constructor() {
        this.adobeAnalytics = window.Bootstrapper; //Adobe Analytics
    }

    pageView() {
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

    send(event){
        try {
            this.adobeAnalytics.ensEvent.trigger("skole-trivsel", event);
        } catch (e) {
            console.log("Could not track event");
        }
    }
}