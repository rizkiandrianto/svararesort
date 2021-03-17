const Fetch = (url, param) => {
  const basic = { baseUrl: 'https://edenresorts.info/wp-json/wp/v2' };
  const settings = param ? { ...basic, ...param } : basic;
  const { baseUrl } = settings;

  return fetch(baseUrl ? baseUrl + url : url).then((res => res.json()));
};

module.exports = {
  fetch: Fetch
};