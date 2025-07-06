# Nepali Calendar Component 🌞

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript) ![License](https://img.shields.io/badge/License-MIT-green) ![Version](https://img.shields.io/badge/Version-1.0.0-blue)

A modern, responsive, and customizable **React calendar component** that supports both **Bikram Sambat (B.S.)** and **Gregorian (A.D.)** calendars, designed for seamless date selection in web applications. Built with 💙 by **Ganesh Bhatt**, a passionate React developer, this component is perfect for applications requiring Nepali date support alongside Gregorian dates, with a custom 365-day B.S. calendar for academic purposes (2070–2081 B.S.).

## 🚀 Features

- **Dual Calendar Support**: Switch between Bikram Sambat (B.S.) and Gregorian (A.D.) calendars, with B.S.-only mode when `dynamicDate` is `false`.
- **Custom B.S. Calendar**: Uses a 365-day structure for 2070–2081 B.S., tailored for academic use:
  - Baisakh, Jestha, Shrawan, Bhadra, Ashwin: 31 days
  - Asar: 32 days
  - Kartik, Poush, Falgun, Chaitra: 30 days
  - Mangsir, Magh: 29 days
- **Responsive Design**: Supports configurable widths (`size` prop: 4, 6, or 12 columns) with a clean, modern UI.
- **Date Constraints**: Restrict dates using `maxAge` (e.g., limit to past years) or `maxDate` (specific date cutoff).
- **TypeScript Support**: Fully typed for robust development.
- **Customizable**: Props for `label`, `variant` (light/dark), `selectTodayDate`, and `onChange` callback.
- **Accessible**: Read-only input field with click-to-open calendar and click-outside-to-close functionality.
- **Beautiful Styling**: Smooth animations, Tailwind-inspired CSS, and a polished look with `aliceblue` background.

## 📸 Screenshot

![Nepali Calendar](./assets/calendar-preview.png)

## 🛠 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ganeshbhatt/nepali-calendar.git
   cd nepali-calendar
   ```

## 📖 Usage


### Props

| Prop              | Type                          | Default     | Description                                                                 |
|-------------------|-------------------------------|-------------|-----------------------------------------------------------------------------|
| `label`           | `string`                      | `undefined` | Label for the input field.                                                 |
| `name`            | `string`                      | `"date"`    | Name attribute for the input field.                                        |
| `maxAge`          | `string`                      | `undefined` | Restrict dates to a maximum age (e.g., `"100"` for 100 years ago).         |
| `maxDate`         | `string`                      | `undefined` | Restrict dates to a specific date (e.g., `"2078-12-30"` for B.S.).         |
| `variant`         | `"light" | "dark"`          | `"light"`   | Theme for the calendar (light or dark).                                    |
| `selectTodayDate` | `boolean`                     | `false`     | Auto-select today’s date on initialization.                                |
| `dynamicDate`     | `boolean`                     | `false`     | Enable A.D./B.S. toggle; `false` for B.S.-only mode.                      |
| `size`            | `4 | 6 | 12`                | `6`         | Width of the calendar (Bootstrap-like grid columns: 33%, 50%, or 100%).    |
| `onChange`        | `function`                    | `undefined` | Callback returning selected date in `{ ad: string, bs: string }` format.   |

### Output Format

The `onChange` callback returns an object like:
```json
{
  "target": { "name": "myDate" },
  "value": {
    "ad": "2025-07-04",
    "bs": "2082-03-20"
  }
}
```

## 🎨 Styling

The calendar uses a clean, modern design with:
- **Tailwind-inspired CSS**: Responsive grid system (`lg-4`, `lg-6`, `lg-12`) for width control.
- **Smooth Animations**: Fade-in effect for the calendar popup.
- **Customizable Themes**: Light (`aliceblue` background) or dark variants.
- **Responsive Layout**: Calendar width matches the input field, controlled by the `size` prop.

Customize styles in `styles.css`:
```css
.calendar-app {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    background: aliceblue;
    margin-top: 8px;
    width: 100%;
    max-width: 100%;
    animation: fadeIn 0.2s ease-in;
}
```

## 📅 Calendar Data

The B.S. calendar uses a custom 365-day structure for 2070–2081 B.S., defined in `pattern.ts`:
- **Months**: Baisakh, Jestha, Asar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra.
- **Day Counts**:
  - 31 days: Baisakh, Jestha, Shrawan, Bhadra, Ashwin
  - 32 days: Asar
  - 30 days: Kartik, Poush, Falgun, Chaitra
  - 29 days: Mangsir, Magh
- **Years**: 2070–2081 B.S. (~2013–2024 C.E.).
- **Note**: This is a custom academic calendar, not a standard B.S. calendar (354–357 days with lunar adjustments).

## 🛠 Development

### Dependencies
- `react`: ^18.2.0
- `typescript`: ^4.9.0
- `bikram-sambat-js`: For B.S./A.D. date conversions

### Project Structure
```
nepali-calendar/
├── src/
│   ├── components/
│   │   └── NepaliCalendar.tsx
│   ├── pattern.ts
│   ├── styles.css
├── package.json
├── README.md
```

### Build
```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! 🎉
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes (`git commit -m 'Add awesome feature'`).
4. Push to the branch (`git push origin feature/awesome-feature`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the Ganesh Bhatt - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- **Ganesh Bhatt**: For designing and developing this component.
- **bikram-sambat-js**: For accurate B.S./A.D. date conversions.
- **React Community**: For the amazing ecosystem and tools.

## 📬 Contact

👤 **Ganesh Bhatt**  
- GitHub: [github.com/ganeshbhatt](https://github.com/ganeshbhatt)  
- Email: ganeshbhatt@example.com  
- LinkedIn: [linkedin.com/in/ganeshbhatt](https://linkedin.com/in/ganeshbhatt)

---

🌟 **Star this repository** if you find it useful! Feel free to reach out with feedback or suggestions.