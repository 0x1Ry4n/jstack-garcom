import axios from 'axios';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000'; 
  }
  
  return 'http://ip:3000/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
});
