import sendRequest from './send-request';
const BASE_URL = '/api/moods';

export function addMood(data) {
  return sendRequest(`${BASE_URL}`, 'POST', data);
}

export function getMoodEntries() {
  return sendRequest(BASE_URL);
}