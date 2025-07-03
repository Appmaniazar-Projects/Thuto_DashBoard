import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { adminAPI } from '../../../services/api';

const COLORS = ['#0088FE', '#00C49F'];

const GenderBreakdown = () => {
  const [data, setData] = useState([
    { name: 'Male', value: 120 },
    { name: 'Female', value: 150 },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getStudents();
        // Process the data to get gender breakdown
        const genderStats = response.data.reduce((acc, student) => {
          acc[student.gender] = (acc[student.gender] || 0) + 1;
          return acc;
        }, {});
        
        setData([
          { name: 'Male', value: genderStats.male || 0 },
          { name: 'Female', value: genderStats.female || 0 },
        ]);
      } catch (error) {
        console.error('Failed to fetch gender breakdown:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 380,
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Student Gender Distribution
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} students`} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GenderBreakdown;