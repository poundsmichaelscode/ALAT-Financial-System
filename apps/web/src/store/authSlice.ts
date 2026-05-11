import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';

export const login = createAsyncThunk('auth/login', async (input: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', input);
    const payload = data?.data;
    if (!data?.success || !payload?.accessToken) return rejectWithValue('Authentication failed. Invalid server response.');
    localStorage.setItem('alat_access_token', payload.accessToken);
    localStorage.setItem('alat_refresh_token', payload.refreshToken);
    return payload.user;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Authentication failed. Check API server and credentials.');
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null as any, loading: false, error: null as string | null },
  reducers: {
    logout(s) { s.user = null; s.error = null; localStorage.removeItem('alat_access_token'); localStorage.removeItem('alat_refresh_token'); },
    clearAuthError(s) { s.error = null; }
  },
  extraReducers: b => {
    b.addCase(login.pending, s => { s.loading = true; s.error = null; })
     .addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
     .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });
  }
});
export const { logout, clearAuthError } = slice.actions;
export default slice.reducer;
