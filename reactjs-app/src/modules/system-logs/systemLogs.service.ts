import apiClient from '../../libs/api-client';

export async function fetchSystemLogs() {
  return apiClient.get('/admin/logs');
}
