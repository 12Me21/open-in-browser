var attachment_names = {}; // this is a hack but I'm not sure how to properly link the request with the download item

// when an http response header is recieved:
chrome.webRequest.onHeadersReceived.addListener(
	function (details) {
		// replace the headers...
		var changed = false;
		var headers = details.responseHeaders.filter( function(header) {
			// filter the old headers list to remove any content-disposition headers
			if (/^content-disposition$/i.test(header.name)) {
				// todo: all these regexes are hacks ugh
				if (/^\s*inline\s*$/i.test(header.value))
					return true;
				// keep track of the suggested filename in case the user wants to download
				var value = decodeURIComponent(header.value);
				console.log("got named attachment: ",  value, attachment_names[details.url], "url:", details.url);
				attachment_names[details.url] = value.match(/\sfilename="?(.*)"?/)?.[1];
				changed = true;
				return false;
			}
			return true;
		});
		if (changed)
			return {responseHeaders: headers};
	},
	{urls: ["<all_urls>"], types: ["main_frame","sub_frame"]},
	["blocking", "responseHeaders"]
);

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
	console.log("suggesting name: ", item, attachment_names[item.url]);
	if (attachment_names[item.url]) {
		suggest({filename: attachment_names[item.url]});
		delete attachment_names[item.url];
	}
});
