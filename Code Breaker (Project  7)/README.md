# 🔐 Code Breaker – The Array Heist

An interactive web-based game that teaches array manipulation concepts through an engaging hacking-themed interface.

## 🎮 Game Concept

You are a hacker in training, trying to break into a secure system by manipulating a digital code array. The vault's password is hidden in a pattern within the array.

## 🎯 Mission Objectives

- ✅ Insert digits to build potential codes
- ✅ Delete wrong digits to fix mistakes  
- ✅ Search for secret patterns to unlock clues
- ✅ Crack the code before time runs out!

## 🚀 Features

### Core Gameplay
- **Visual Array Display**: 10 cells showing numbers or empty spaces
- **Insert Operation**: Add numbers at specific indices with right-shift animation
- **Delete Operation**: Remove numbers with left-shift animation
- **Search Operation**: Find subarray patterns with visual highlighting
- **Reset Function**: Clear the array and start fresh

### Advanced Features
- **Multiple Levels**: 3 progressively challenging levels
  - Level 1: Find a 3-digit pattern `[2, 1, 4]`
  - Level 2: Find a 4-digit pattern `[7, 3, 9, 1]`
  - Level 3: Find a 5-digit pattern in reverse order `[5, 2, 8, 6, 3]`
- **Time Attack Mode**: 60-second timer with visual countdown
- **Sound Effects**: Audio feedback for all operations
- **Animations**: Smooth visual effects for insert, delete, and search operations
- **Responsive Design**: Works on desktop and mobile devices

### Visual Effects
- **Insert Animation**: Elements slide right, new number fades in
- **Delete Animation**: Elements slide left, deleted number shrinks and fades
- **Search Animation**: Highlights each segment as it checks for patterns
- **Success Effects**: Golden glow and victory fanfare on completion

## 🎮 How to Play

### Getting Started
1. Open `index.html` in your web browser
2. The game starts automatically with a 60-second timer
3. Your goal is to find the target pattern shown at the top

### Operations

#### Insert Operation
1. Enter an index (0-9) where you want to insert
2. Enter a value (0-9) to insert
3. Click "Insert" or press Enter
4. The array will shift elements right and insert your number

#### Delete Operation
1. Enter an index (0-9) of the element to delete
2. Click "Delete" or press Enter
3. The element will be removed and others will shift left

#### Search Operation
1. Enter a pattern in the format "1,2,3" (comma-separated numbers)
2. Click "Search" or press Enter
3. The game will highlight segments as it searches
4. If found, you'll see a success message and hear a victory sound

### Level Progression
- Complete each level by finding the target pattern
- Click "Next Level" to advance
- Each level has a different pattern and increased difficulty
- Complete all 3 levels to become a master hacker!

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Object-oriented game logic with classes

### Key Algorithms
- **Array Insertion**: O(n) time complexity with right-shift
- **Array Deletion**: O(n) time complexity with left-shift  
- **Pattern Matching**: Linear search for subarrays
- **Audio Synthesis**: Web Audio API for sound effects

### Code Structure
```
CodeBreakerGame Class
├── Constructor & Initialization
├── Array Operations (Insert/Delete/Search)
├── Animation System
├── Sound Effects
├── Timer Management
├── Level Progression
└── Event Handling
```

## 🎨 Design Features

### Visual Theme
- **Cyberpunk Aesthetic**: Dark background with neon green accents
- **Monospace Font**: Courier New for that authentic terminal feel
- **Glowing Effects**: Text shadows and box shadows for depth
- **Color Coding**: Different colors for different operations

### Responsive Design
- **Mobile-Friendly**: Adapts to different screen sizes
- **Touch-Friendly**: Large buttons and inputs for mobile devices
- **Flexible Layout**: CSS Grid and Flexbox for optimal positioning

## 🎵 Sound Effects

The game includes audio feedback using the Web Audio API:
- **Insert Beep**: High-frequency tone (800Hz)
- **Delete Beep**: Low-frequency tone (400Hz)  
- **Error Buzz**: Very low frequency (200Hz)
- **Victory Fanfare**: Musical chord progression (C-E-G-C)

## 🚀 How to Run

1. **Download/Clone** the project files
2. **Open** `index.html` in any modern web browser
3. **Start Playing** immediately - no installation required!

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Requirements
- Modern web browser with JavaScript enabled
- Audio support for sound effects (optional)

## 🎓 Educational Value

This game teaches fundamental programming concepts:
- **Array Manipulation**: Insertion and deletion operations
- **Linear Search**: Pattern matching algorithms
- **Time Complexity**: Understanding O(n) operations
- **User Interface Design**: Interactive web development
- **Animation Programming**: CSS and JavaScript animations

## 🏆 Game Tips

1. **Plan Ahead**: Think about where you want to place numbers before inserting
2. **Use Search Wisely**: Search for patterns to verify your work
3. **Watch the Timer**: Don't get too focused on one approach
4. **Reset When Needed**: Use the reset button if you get stuck
5. **Listen for Audio**: Sound effects provide helpful feedback

## 🐛 Troubleshooting

### Common Issues
- **No Sound**: Check browser audio permissions
- **Animations Not Working**: Ensure JavaScript is enabled
- **Mobile Layout Issues**: Try rotating your device

### Performance
- The game is optimized for smooth 60fps animations
- Audio synthesis is lightweight and efficient
- Responsive design ensures good performance on all devices

## 📝 License

This project is open source and available for educational use.

---

**Happy Hacking! 🔐💻**
