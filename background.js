var last_attachment_name // this is a hack but I'm not sure how to properly link the request with the download item

// when an http response header is recieved:
chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		last_attachment_name = undefined;
		// replace the headers...
		return {responseHeaders: details.responseHeaders.filter( function(header) {
			// filter the old headers list to remove any content-disposition headers
			if (header.name.toLowerCase()=="content-disposition") {
				// keep track of the suggested filename in case the user wants to download
				var value = decodeURIComponent(header.value)
				last_attachment_name = value.match(/\sfilename="?(.*)"?/)?.[1] // todo: this regex should match the way the browser parses this. maybe there's a builtin for it?
				console.log("got named attachment: ",  value, last_attachment_name)
				return false
			}
			return true
		})}
	},
	{urls: ["<all_urls>"], types: ["main_frame","sub_frame"]},
	["blocking", "responseHeaders"]
)

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
	console.log("suggesting name: ", last_attachment_name)
	if (last_attachment_name)
		suggest({filename: last_attachment_name})
})
