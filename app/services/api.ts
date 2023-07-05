import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tbudchzzlkozxbwpctfi.supabase.co/rest/v1',
});

// Products?select=*
