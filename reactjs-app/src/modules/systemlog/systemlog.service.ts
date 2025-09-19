export interface SystemLogFilter {
  actor?: string;
  status?: string;
  start?: string;
  end?: string;
}

export async function fetchSystemLogsWithFilter(filter: SystemLogFilter): Promise<SystemLog[]> {
  const params: Record<string, string> = {};
  if (filter.actor) params.actor = filter.actor;
  if (filter.status) params.status = filter.status;
  if (filter.start) params.start = filter.start;
  if (filter.end) params.end = filter.end;
  const query = new URLSearchParams(params).toString();
  const url = query ? `/system-logs?${query}` : '/system-logs';
  const res = await apiClient.get(url);
  if (Array.isArray(res)) return res as SystemLog[];
  if (res && Array.isArray(res.data)) return res.data as SystemLog[];
  return [];
}
import apiClient from '../../libs/api-client';
import type { SystemLog } from './systemlog.type';

export async function fetchSystemLogs(): Promise<SystemLog[]> {
  const res = await apiClient.get('/system-logs');
  console.log('SystemLog API response:', res);
  if (Array.isArray(res)) return res as SystemLog[];
  if (res && Array.isArray(res.data)) return res.data as SystemLog[];
  return [];
}
