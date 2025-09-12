import apiClient from '../../libs/api-client';

// Mock data for demonstration when API is not available
const mockLogs = [
  {
    id: 1,
    timestamp: '2024-01-20 10:30:15',
    actor: 'admin',
    targetUserId: 'user123',
    action: 'LOGIN',
    description: 'User successfully logged in',
    level: 'INFO'
  },
  {
    id: 2,
    timestamp: '2024-01-20 11:15:30',
    actor: 'admin',
    targetUserId: 'emp456',
    action: 'CREATE_JOB',
    description: 'New job posting created: Senior Developer',
    level: 'INFO'
  },
  {
    id: 3,
    timestamp: '2024-01-20 12:45:22',
    actor: 'system',
    targetUserId: null,
    action: 'ERROR',
    description: 'Database connection timeout',
    level: 'ERROR'
  },
  {
    id: 4,
    timestamp: '2024-01-20 14:20:45',
    actor: 'admin',
    targetUserId: 'user789',
    action: 'DELETE_USER',
    description: 'User account deleted by administrator',
    level: 'WARNING'
  },
  {
    id: 5,
    timestamp: '2024-01-20 15:30:12',
    actor: 'candidate001',
    targetUserId: 'candidate001',
    action: 'APPLY_JOB',
    description: 'Application submitted for Frontend Developer position',
    level: 'INFO'
  }
];

export async function fetchSystemLogs() {
  try {
    // Try to fetch from real API first
    return await apiClient.get('/admin/logs');
  } catch (error) {
    // If API is not available, return mock data for demonstration
    console.warn('API not available, using mock data for demonstration');
    return mockLogs;
  }
}
