import axios from 'axios';

// https://data.brreg.no/enhetsregisteret/api/docs/index.html#introduksjon

const API_URL = 'https://data.brreg.no/enhetsregisteret/api/enheter';

const apiGetOrganizations = async (name, limit = 5) => {
  if (!name) return [];
  let url = `${API_URL}?navn=${name}&size=${limit}`;
  try {
    const res = await axios.get(url);
    return res.data._embedded?.enheter || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  apiGetOrganizations,
};
