class CodeBreakerGame {
    constructor() {
        this.array = new Array(10).fill(null);
        this.currentLevel = 1;
        this.targetPattern = [];
        this.timer = 60;
        this.timerInterval = null;
        this.gameActive = true;
        this.startTime = Date.now();
        
        this.initializeGame();
        this.setupEventListeners();
        this.startTimer();
    }

    initializeGame() {
        this.generateTargetPattern();
        this.updateDisplay();
        this.updateLevelInfo();
    }

    generateTargetPattern() {
        const patterns = {
            1: [2, 1, 4], // Level 1: 3-digit pattern
            2: [7, 3, 9, 1], // Level 2: 4-digit pattern
            3: [5, 2, 8, 6, 3] // Level 3: 5-digit pattern in reverse order
        };
        
        this.targetPattern = patterns[this.currentLevel] || [2, 1, 4];
        document.getElementById('target-pattern').textContent = `[${this.targetPattern.join(', ')}]`;
    }

    updateDisplay() {
        const arrayDisplay = document.getElementById('array-display');
        arrayDisplay.innerHTML = '';
        
        this.array.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'array-cell';
            cell.textContent = value !== null ? value : '';
            cell.dataset.index = index;
            
            if (value === null) {
                cell.classList.add('empty');
            }
            
            arrayDisplay.appendChild(cell);
        });
    }

    updateLevelInfo() {
        document.getElementById('level').textContent = this.currentLevel;
    }

    showMessage(message, type = 'status') {
        const statusMessage = document.getElementById('status-message');
        const successMessage = document.getElementById('success-message');
        
        if (type === 'success') {
            successMessage.textContent = message;
            successMessage.classList.remove('hidden');
            statusMessage.classList.add('hidden');
        } else {
            statusMessage.textContent = message;
            statusMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }
    }

    playSound(type) {
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        switch(type) {
            case 'insert':
                this.playBeep(audioContext, 800, 0.1);
                break;
            case 'delete':
                this.playBeep(audioContext, 400, 0.1);
                break;
            case 'error':
                this.playBeep(audioContext, 200, 0.2);
                break;
            case 'success':
                this.playSuccessSound(audioContext);
                break;
        }
    }

    playBeep(audioContext, frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    playSuccessSound(audioContext) {
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playBeep(audioContext, freq, 0.3);
            }, index * 200);
        });
    }

    insertElement(index, value) {
        if (index < 0 || index > this.array.length) {
            this.showMessage('Index out of bounds!', 'error');
            this.playSound('error');
            return false;
        }

        if (value < 0 || value > 9) {
            this.showMessage('Value must be between 0 and 9!', 'error');
            this.playSound('error');
            return false;
        }

        // Shift elements to the right
        for (let i = this.array.length - 1; i > index; i--) {
            this.array[i] = this.array[i - 1];
        }
        
        this.array[index] = value;
        this.playSound('insert');
        this.showMessage(`Inserted ${value} at index ${index}!`);
        
        this.updateDisplay();
        this.animateInsert(index);
        
        return true;
    }

    deleteElement(index) {
        if (index < 0 || index >= this.array.length) {
            this.showMessage('Index out of bounds!', 'error');
            this.playSound('error');
            return false;
        }

        if (this.array[index] === null) {
            this.showMessage('No element to delete at this index!', 'error');
            this.playSound('error');
            return false;
        }

        const deletedValue = this.array[index];
        
        // Shift elements to the left
        for (let i = index; i < this.array.length - 1; i++) {
            this.array[i] = this.array[i + 1];
        }
        this.array[this.array.length - 1] = null;
        
        this.playSound('delete');
        this.showMessage(`Deleted element ${deletedValue} at index ${index}.`);
        
        this.updateDisplay();
        this.animateDelete(index);
        
        return true;
    }

    searchPattern(patternStr) {
        if (!patternStr.trim()) {
            this.showMessage('Please enter a pattern to search for!', 'error');
            this.playSound('error');
            return;
        }

        const pattern = patternStr.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        
        if (pattern.length === 0) {
            this.showMessage('Enter a valid pattern (e.g., 1,2,3)', 'error');
            this.playSound('error');
            return;
        }

        this.animateSearch(pattern);
        
        // Check for normal pattern
        const normalIndex = this.findSubarray(this.array, pattern);
        if (normalIndex !== -1) {
            this.showMessage(`Pattern [${pattern.join(', ')}] found at index ${normalIndex}!`, 'success');
            this.playSound('success');
            this.checkLevelComplete();
            return;
        }

        // Check for reverse pattern (Level 3)
        if (this.currentLevel === 3) {
            const reversePattern = [...pattern].reverse();
            const reverseIndex = this.findSubarray(this.array, reversePattern);
            if (reverseIndex !== -1) {
                this.showMessage(`Reverse pattern [${reversePattern.join(', ')}] found at index ${reverseIndex}!`, 'success');
                this.playSound('success');
                this.checkLevelComplete();
                return;
            }
        }

        this.showMessage(`Pattern [${pattern.join(', ')}] not found in the array.`);
    }

    findSubarray(array, pattern) {
        for (let i = 0; i <= array.length - pattern.length; i++) {
            let found = true;
            for (let j = 0; j < pattern.length; j++) {
                if (array[i + j] !== pattern[j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return i;
            }
        }
        return -1;
    }

    animateInsert(index) {
        const cells = document.querySelectorAll('.array-cell');
        if (cells[index]) {
            cells[index].classList.add('insert-animation');
            setTimeout(() => {
                cells[index].classList.remove('insert-animation');
            }, 500);
        }
    }

    animateDelete(index) {
        const cells = document.querySelectorAll('.array-cell');
        if (cells[index]) {
            cells[index].classList.add('delete-animation');
            setTimeout(() => {
                cells[index].classList.remove('delete-animation');
            }, 500);
        }
    }

    async animateSearch(pattern) {
        const cells = document.querySelectorAll('.array-cell');
        
        for (let i = 0; i <= this.array.length - pattern.length; i++) {
            // Highlight current segment
            for (let j = 0; j < pattern.length; j++) {
                if (cells[i + j]) {
                    cells[i + j].classList.add('highlight');
                }
            }
            
            await this.sleep(300);
            
            // Check if pattern matches
            let matches = true;
            for (let j = 0; j < pattern.length; j++) {
                if (this.array[i + j] !== pattern[j]) {
                    matches = false;
                    break;
                }
            }
            
            // Remove highlight
            for (let j = 0; j < pattern.length; j++) {
                if (cells[i + j]) {
                    cells[i + j].classList.remove('highlight');
                }
            }
            
            if (matches) {
                // Highlight found pattern
                for (let j = 0; j < pattern.length; j++) {
                    if (cells[i + j]) {
                        cells[i + j].classList.add('highlight');
                    }
                }
                break;
            }
            
            await this.sleep(100);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    checkLevelComplete() {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        const remainingTime = this.timer;
        
        if (this.currentLevel < 3) {
            setTimeout(() => {
                this.showMessage(`Level ${this.currentLevel} Complete! You cracked the code in ${remainingTime} seconds! 🎉`, 'success');
                document.getElementById('next-level-btn').classList.remove('hidden');
            }, 1000);
        } else {
            setTimeout(() => {
                this.showMessage(`🎉 Congratulations! You've completed all levels in ${remainingTime} seconds! You're a master hacker! 🎉`, 'success');
                this.gameActive = false;
                this.stopTimer();
            }, 1000);
        }
    }

    nextLevel() {
        this.currentLevel++;
        this.array = new Array(10).fill(null);
        this.timer = 60;
        this.startTime = Date.now();
        this.gameActive = true;
        
        document.getElementById('next-level-btn').classList.add('hidden');
        document.getElementById('success-message').classList.add('hidden');
        
        this.initializeGame();
        this.startTimer();
        this.showMessage(`Welcome to Level ${this.currentLevel}! Good luck, hacker!`);
    }

    resetArray() {
        this.array = new Array(10).fill(null);
        this.updateDisplay();
        this.showMessage('Array reset! Start fresh, hacker!');
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.timer > 0 && this.gameActive) {
                this.timer--;
                document.getElementById('timer').textContent = this.timer;
                
                if (this.timer <= 10) {
                    document.getElementById('timer').style.color = '#ff4444';
                }
            } else if (this.timer <= 0 && this.gameActive) {
                this.gameOver();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    gameOver() {
        this.gameActive = false;
        this.stopTimer();
        this.showMessage('⏰ Time's up! The system has locked you out! Try again, hacker!', 'error');
        this.playSound('error');
    }

    setupEventListeners() {
        // Insert button
        document.getElementById('insert-btn').addEventListener('click', () => {
            const index = parseInt(document.getElementById('insert-index').value);
            const value = parseInt(document.getElementById('insert-value').value);
            
            if (isNaN(index) || isNaN(value)) {
                this.showMessage('Please enter valid numbers for index and value!', 'error');
                this.playSound('error');
                return;
            }
            
            this.insertElement(index, value);
        });

        // Delete button
        document.getElementById('delete-btn').addEventListener('click', () => {
            const index = parseInt(document.getElementById('delete-index').value);
            
            if (isNaN(index)) {
                this.showMessage('Please enter a valid index!', 'error');
                this.playSound('error');
                return;
            }
            
            this.deleteElement(index);
        });

        // Search button
        document.getElementById('search-btn').addEventListener('click', () => {
            const pattern = document.getElementById('search-pattern').value;
            this.searchPattern(pattern);
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetArray();
        });

        // Next level button
        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        // Enter key support for inputs
        document.getElementById('insert-index').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('insert-btn').click();
            }
        });

        document.getElementById('insert-value').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('insert-btn').click();
            }
        });

        document.getElementById('delete-index').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('delete-btn').click();
            }
        });

        document.getElementById('search-pattern').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search-btn').click();
            }
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CodeBreakerGame();
});
