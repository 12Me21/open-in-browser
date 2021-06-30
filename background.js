chrome.webRequest.onHeadersReceived.addListener(
	function(response) {
		return {responseHeaders: response.responseHeaders.filter(
			header => header.name.toLowerCase()!="content-disposition"
		)};
	},
	{urls: ["<all_urls>"], types: ["main_frame","sub_frame"]},
	["blocking","responseHeaders"]
);
