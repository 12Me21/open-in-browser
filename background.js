// when an http response header is recieved:
chrome.webRequest.onHeadersReceived.addListener(
	(details)=>{
		let changed = false
		for (let header of details.responseHeaders)
			if (/^content-disposition$/i.test(header.name))
				if (/^\s*attachment/i.test(header.value)) {
					header.value = header.value.replace(/attachment/i, "inline")
					changed = true
					//console.log("changed header!", details.responseHeaders)
				}
		if (changed)
			return {responseHeaders: details.responseHeaders}
	},
	{urls: ["<all_urls>"], types: ["main_frame","sub_frame"]},
	["blocking", "responseHeaders"],
)
