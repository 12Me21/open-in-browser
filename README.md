chrome/edge extension which removes `content-disposition` headers from http responses
(if this header is set to "attachment", the file will be downloaded rather than displayed in the browser)  
Similar to the "open in browser" addon for firefox, but with less features probably...

Code is based on the "Modify Content-Type" chrome extension


~~NOTE: this will remove the suggested filename from the response  
so, if you actually want to download a file, it may not have the correct name (the browser will try to determine a name from the url instead)  
for now, i recommend just disabling the extension when downloading things (maybe leave it off all the time, and only enable it when needed?)  
I'm not entirely sure how to fix this...~~
Update: this will preserve filenames when downloading a file from a `<a href="..." download="name">...</a>` link, as well as filetypes which can't be displayed in the browser
however, files like text and images, which are displayed in the browser, will not have their name preserved if you save them with ctrl+s.
