const Fetch = (url, param) => {
  const basic = { baseUrl: `${process.env.NEXT_PUBLIC_API_HOST}/wp-json/wp/v2` };
  const settings = param ? { ...basic, ...param } : basic;
  const { baseUrl, headers, ...setting } = settings;
  const finalUrl = baseUrl ? baseUrl + url : url;
  const options = {
    ...(setting || {}),
    redirect: 'follow'
  }

  if (headers) {
    const newHeader = {};
    Object.keys(headers).forEach((header) => {
      newHeader[header] = headers[header];
    });
    options.headers = newHeader;
  }

  return fetch(finalUrl, options).then((res => {
    if (res.status === 200) return res.json();

    return false;
  }));
};

module.exports = {
  fetch: Fetch
};