import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { adminAPI } from '../../../services/api';

const AttendanceStats = () => {
  const [stats, setStats] = useState({
    average: 93.4,
    change: '+1.2%',
    loading: false
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));
        const response = await adminAPI.getAttendanceStats();
        setStats({
          average: response.data.average,
          change: response.data.change,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch attendance stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 120,
        bgcolor: '#f5f5f5',
        borderLeft: '4px solid #2e7d32',
      }}
    >
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        Average Attendance
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'medium', color: '#2e7d32' }}>
        {stats.loading ? '...' : `${stats.average}%`}
      </Typography>
      <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
        {stats.change} from last week
      </Typography>
    </Paper>
  );
};

export default AttendanceStats;