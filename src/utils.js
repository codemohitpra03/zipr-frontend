export default function completeUrl(url) {
    // Check if the URL starts with "http://" or "https://"
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // If not, add "https://"
        url = 'https://' + url;
    }

    // Check if the URL contains "www."
    if (!url.includes('www.')) {
        // If not, add "www."
        url = url.replace('://', '://www.');
    }

    // Check if the URL ends with a domain extension (e.g., ".com", ".org")
    // if (!url.match(/\.[a-zA-Z]{2,}$/)) {
    //     // If not, assume ".com" as default
    //     url += '.com';
    // }

    return url;
}

// Example usage:
const inputUrl1 = 'www.google.com';
const inputUrl2 = 'google.come';
const inputUrl3 = 'https://www.example.org';

console.log(completeUrl(inputUrl1)); // Output: "https://www.google.com"
console.log(completeUrl(inputUrl2)); // Output: "https://www.google.come.com"
console.log(completeUrl(inputUrl3)); // Output: "https://www.example.org"
