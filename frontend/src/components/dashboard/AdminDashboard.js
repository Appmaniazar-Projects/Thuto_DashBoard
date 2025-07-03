import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Layout from '../layout/Layout';
import EnrollmentStats from './admin/EnrollmentStats';
import AttendanceStats from './admin/AttendanceStats';
import GenderBreakdown from './admin/GenderBreakdown';
import CalendarPanel from './admin/CalendarPanel';
import MessagesPanel from './admin/MessagesPanel';

const AdminDashboard = () => {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Admin Dashboard
        </Typography>

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <EnrollmentStats />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <AttendanceStats />
          </Grid>
        </Grid>

        {/* Charts and Panels */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <GenderBreakdown />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <CalendarPanel />
          </Grid>
          <Grid item xs={12}>
            <MessagesPanel />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AdminDashboard;