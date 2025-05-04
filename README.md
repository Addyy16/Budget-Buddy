# Budget Buddy - Student Expense Forecasting

Budget Buddy is a modern web application designed to help students track their expenses, forecast spending patterns, and manage their monthly budget effectively. With an intuitive interface and powerful forecasting capabilities, it helps ensure you never run out of money before month-end.


## Features

- 📊 Daily/weekly expense tracking with categorization
- 💰 Fixed costs management (rent, utilities, subscriptions)
- 🔮 Intelligent money forecasting
- 💡 Personalized daily savings recommendations
- 📈 Visual spending trends and forecasts
- 💾 Local storage for data persistence
- 📱 Responsive design for all devices
- 🌙 Beautiful dark mode interface

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budget-buddy.git
   ```

2. Navigate to the project directory:
   ```bash
   cd budget-buddy
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Usage

1. **Initial Setup**
   - Enter your name when prompted
   - Set your monthly budget amount
   - The app will automatically set the budget period to the current month

2. **Adding Expenses**
   - Click "Add New Expense" to record daily spending
   - Enter the amount, category, and optional description
   - The expense will be automatically saved

3. **Managing Fixed Costs**
   - Add recurring expenses like rent or subscriptions
   - These will be factored into your monthly forecasts

4. **Viewing Forecasts**
   - Check the dashboard for spending predictions
   - View the forecast chart to see projected balances
   - Get alerts if you're likely to run out of money

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Project Structure

```
budget-buddy/
├── src/
│   ├── components/     # React components
│   ├── utils/         # Helper functions
│   ├── types/         # TypeScript definitions
│   └── App.tsx        # Main application
├── public/            # Static assets
└── index.html         # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Created with 💚 by [Aditya Prajapati](https://github.com/Addyy16)

---

**Note**: This project uses local storage for data persistence. Your data remains in your browser and is not sent to any external servers.
