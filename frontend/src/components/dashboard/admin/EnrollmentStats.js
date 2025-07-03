import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { adminAPI } from '../../../services/api';

const EnrollmentStats = () => {
  const [stats, setStats] = useState({
    total: 853,
    change: '+2.3%',
    loading: false
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));
        const response = await adminAPI.getEnrollmentStats();
        setStats({
          total: response.data.total,
          change: response.data.change,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch enrollment stats:', error);
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
        borderLeft: '4px solid #1976d2',
      }}
    >
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        Total Enrollment
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'medium', color: '#1976d2' }}>
        {stats.loading ? '...' : stats.total}
      </Typography>
      <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
        {stats.change} from last month
      </Typography>
    </Paper>
  );
};

export default EnrollmentStats;