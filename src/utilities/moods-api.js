import sendRequest from './send-request';
const BASE_URL = '/api/moods';

export function addMood(data) {
  return sendRequest(`${BASE_URL}/moods`, 'POST', data);
}