// when an http response header is recieved:
chrome.webRequest.onHeadersReceived.addListener(
	(details)=>{
		let changed = false
		for (let header of headers)
			if (/^content-disposition$/i.test(header.name))
				if (/^\s*attachment/i.test(header.value)) {
					header.value = header.value.replace(/attachment/i, "inline")
					changed = true
					console.log("changed header!", headers)
				}
		if (changed)
			return {responseHeaders: headers}
	},
	{urls: ["<all_urls>"], types: ["main_frame","sub_frame"]},
	["blocking", "responseHeaders"],
)
