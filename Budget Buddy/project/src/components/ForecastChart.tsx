import React, { useEffect, useRef } from 'react';
import { User } from '../types';
import { generateSpendingForecast, calculateRemainingDays } from '../utils/calculators';

interface ForecastChartProps {
  user: User;
}

const ForecastChart: React.FC<ForecastChartProps> = ({ user }) => {
  const { budget, expenses, fixedCosts } = user;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !budget) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Get forecast data
    const remainingDays = calculateRemainingDays();
    const forecastData = generateSpendingForecast(budget, expenses, fixedCosts, remainingDays);
    
    // Set chart dimensions
    const padding = 40;
    const chartWidth = canvasRef.current.width - padding * 2;
    const chartHeight = canvasRef.current.height - padding * 2;
    
    // Find max value for scaling
    const maxValue = budget.amount;
    
    // Draw background
    ctx.fillStyle = '#1e293b'; // Darker shade of slate blue
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#475569'; // Slate gray
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.moveTo(padding, canvasRef.current.height - padding);
    ctx.lineTo(canvasRef.current.width - padding, canvasRef.current.height - padding);
    
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvasRef.current.height - padding);
    ctx.stroke();
    
    // Draw grid lines
    const gridLineCount = 5;
    ctx.beginPath();
    ctx.strokeStyle = '#334155'; // Lighter slate
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let i = 1; i < gridLineCount; i++) {
      const y = padding + (chartHeight / gridLineCount) * i;
      ctx.moveTo(padding, y);
      ctx.lineTo(canvasRef.current.width - padding, y);
    }
    
    // Vertical grid lines
    const dayLabels = [1, 5, 10, 15, 20, 25, 30];
    for (const day of dayLabels) {
      if (day <= remainingDays) {
        const x = padding + (chartWidth / remainingDays) * (day - 1);
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvasRef.current.height - padding);
      }
    }
    ctx.stroke();
    
    // Draw data line
    if (forecastData.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#14b8a6'; // Teal
      ctx.lineWidth = 3;
      
      // Start point
      const startX = padding;
      const startY = canvasRef.current.height - padding - (chartHeight * (budget.amount / maxValue));
      ctx.moveTo(startX, startY);
      
      // Plot points
      forecastData.forEach((value, index) => {
        const x = padding + (chartWidth / remainingDays) * index;
        const y = canvasRef.current.height - padding - (chartHeight * (value / maxValue));
        ctx.lineTo(x, y);
      });
      
      ctx.stroke();
      
      // Add gradient under the line
      const gradient = ctx.createLinearGradient(0, padding, 0, canvasRef.current.height - padding);
      gradient.addColorStop(0, 'rgba(20, 184, 166, 0.3)'); // Teal with transparency
      gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      forecastData.forEach((value, index) => {
        const x = padding + (chartWidth / remainingDays) * index;
        const y = canvasRef.current.height - padding - (chartHeight * (value / maxValue));
        ctx.lineTo(x, y);
      });
      
      ctx.lineTo(padding + chartWidth, canvasRef.current.height - padding);
      ctx.lineTo(padding, canvasRef.current.height - padding);
      ctx.closePath();
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add data points
      forecastData.forEach((value, index) => {
        if (index % 5 === 0 || index === forecastData.length - 1) { // Draw points every 5 days and the last point
          const x = padding + (chartWidth / remainingDays) * index;
          const y = canvasRef.current.height - padding - (chartHeight * (value / maxValue));
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = '#f0f9ff'; // Light sky blue
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = '#14b8a6'; // Teal
          ctx.fill();
        }
      });
    }
    
    // Add labels
    ctx.fillStyle = '#94a3b8'; // Slate gray text
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    
    // Y-axis labels (budget amount)
    for (let i = 0; i <= gridLineCount; i++) {
      const value = (maxValue / gridLineCount) * i;
      const y = canvasRef.current.height - padding - (chartHeight / gridLineCount) * i;
      
      ctx.fillText(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value),
        padding - 10,
        y + 4
      );
    }
    
    // X-axis labels (days)
    ctx.textAlign = 'center';
    for (const day of dayLabels) {
      if (day <= remainingDays) {
        const x = padding + (chartWidth / remainingDays) * (day - 1);
        ctx.fillText(`Day ${day}`, x, canvasRef.current.height - padding + 20);
      }
    }
    
    // Add title
    ctx.fillStyle = '#f1f5f9'; // Light slate
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Spending Forecast for the Next ' + remainingDays + ' Days',
      canvasRef.current.width / 2,
      20
    );
    
  }, [user]);
  
  if (!budget) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-white mb-4">No Budget Set</h3>
          <p className="text-gray-400">Please set a budget to see your spending forecast.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Spending Forecast</h3>
        
        <div className="w-full">
          <canvas 
            ref={canvasRef} 
            width="600" 
            height="300"
            className="w-full h-auto"
          />
        </div>
        
        <div className="mt-4 text-sm text-gray-400 text-center">
          <p>This forecast shows your projected remaining budget over time based on your current spending rate.</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;