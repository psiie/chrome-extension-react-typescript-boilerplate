// import * as d from 'chrome';
// import chrome from 'chrome';

(chrome.extension as any).sendMessage({}, (response: any) => {
	var readyStateCheckInterval = setInterval(() => {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});