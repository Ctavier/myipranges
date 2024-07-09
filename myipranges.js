// myipranges.js

const ipRanges = [
    { start: '41.112.0.0', end: '41.128.0.0' },
    { start: '41.208.11.0', end: '41.208.12.0' },
    { start: '41.208.48.0', end: '41.208.51.0' },
    { start: '197.64.0.0', end: '197.80.0.0' }
];

function ipToLong(ip) {
    return ip.split('.').reduce((ipLong, octet) => {
        return (ipLong << 8) + parseInt(octet, 10);
    }, 0) >>> 0;
}

function isIpInRange(ip, range) {
    const ipLong = ipToLong(ip);
    const startLong = ipToLong(range.start);
    const endLong = ipToLong(range.end);
    return ipLong >= startLong && ipLong <= endLong;
}

async function redirectBasedOnIp(urlA, urlB) {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIp = data.ip;

        const redirectToUrlA = ipRanges.some(range => isIpInRange(userIp, range));

        if (redirectToUrlA) {
            window.location.href = urlA;
        } else {
            window.location.href = urlB;
        }
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
}
