import axios from 'axios';
import { logout } from './shared/utils/auth';

const apiClient = axios.create({
  // window.location.host.indexOf('localhost') >= 0
  // ? 'http://127.0.0.1:5002/api'
  // : `${window.location.host}/api`;
  baseURL:
    window.location.host.indexOf('localhost') >= 0
      ? 'http://localhost:5002/api'
      : `${window.location.host}/api`,
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes

export const login = async (data) => {
  console.log('host',window.location.host.indexOf('localhost'),window.location.host)
  try {
    return await apiClient.post('/auth/login', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
  
    return await apiClient.post('/auth/register', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// secure routes
export const sendFriendInvitation = async (data) => {
  try {
    const userDetails = localStorage.getItem('user');
    const token = JSON.parse(userDetails).userDetails.token;
    console.log(token);
    return await apiClient.post(
      '/friend-invitation/invite',
      { targetMailAddress: data.mail, token: `Bearer ${token}` },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (exception) {
    // checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptInvitation = async (data) => {
  try {
    const userDetails = localStorage.getItem('user');
    const token = JSON.parse(userDetails).userDetails.token;
    return await apiClient.post('/friend-invitation/accept', {
      data,
      token: `Bearer ${token}`,
    });
  } catch (exception) {
    // checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectInvitation = async (data) => {
  try {
    const userDetails = localStorage.getItem('user');
    const token = JSON.parse(userDetails).userDetails.token;
    return await apiClient.post('/friend-invitation/reject', {
      data,
      token: `Bearer ${token}`,
    });
  } catch (exception) {
    // checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
