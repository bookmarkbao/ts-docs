Below is a simplified documentation in English. It explains the basic idea and how all parts work together. It’s designed for beginners who understand some programming but may be new to these technologies and concepts.

---

### Overview

This solution combines three technologies—**LokiJS**, **IndexedDB**, and **MongoDB**—to build a reliable, efficient word-learning progress tracker. The goal is to support fast offline queries, local storage, and cloud backups.

- **LokiJS**: A lightweight in-memory JavaScript database for quick reads, writes, and offline usage.  
- **IndexedDB**: A built-in browser database for persistent local storage, ensuring data is not lost when the page reloads.  
- **MongoDB**: A cloud-based NoSQL database for backing up data and synchronizing across multiple devices.

### How It Works

**1. Real-Time Updates (Front-End)**  
- When you learn or review a word, the change is immediately recorded in LokiJS.  
- A short interval timer (e.g., every 1 second) takes these changes and saves them into IndexedDB. This ensures that even if you close your browser, your progress is kept locally.

**2. Scheduled Sync to the Cloud (Back-End)**  
- A longer interval timer (e.g., every hour) will sync data from IndexedDB to MongoDB in the cloud.  
- This sync:
  - Reads all new changes from IndexedDB.
  - Updates the MongoDB database to reflect these changes.
  - Stores the full set of data as a backup.
  - Clears the local change logs after successful sync.

With this approach, your data is always quickly available (via LokiJS in memory), safely stored locally (via IndexedDB), and regularly backed up to the cloud (via MongoDB).

### Data Models

**Word Record Example**:
```json
{
  "word": "apple",
  "first_learned": "2023-10-01T10:00:00Z",
  "last_reviewed": "2023-10-05T15:00:00Z",
  "learning_status": "active",
  "error_count": 2,
  "correct_count": 8,
  "next_scheduled_review": "2023-10-10T10:00:00Z",
  "learning_requirement": "write"
}
```

- **word**: The vocabulary word.
- **first_learned**: When you first studied the word.
- **last_reviewed**: When you last reviewed the word.
- **learning_status**: The current state (e.g., “active”, “mastered”, or “removed”).
- **error_count** and **correct_count**: Track your performance.
- **next_scheduled_review**: When you should review the word next.
- **learning_requirement**: How you should study the word (just recognize it or be able to write it).

**Daily Task Example**:
```json
{
  "date": "2023-10-06",
  "tasks": [
    {
      "word": "apple",
      "task_type": "review",
      "status": "pending",
      "learning_requirement": "write"
    },
    {
      "word": "banana",
      "task_type": "learn",
      "status": "completed",
      "learning_requirement": "recognize"
    }
  ]
}
```

- **task_type**: “learn” (new word) or “review” (previously learned word).
- **status**: “pending” (not done yet), “completed” (task finished), or “deferred” (postponed to a later date).

### Memory Strength & Review Intervals

- **Memory Strength**: Calculated as `correct_count / (correct_count + error_count)`; if no errors, it’s 1.
- **Adjusting Review Time**: The better you do (high memory strength), the longer until your next review.

### Scheduling and Planning

- Each day, the system:
  - Assigns new words to learn.
  - Picks words due for review based on the **Ebbinghaus** principle (gradual increase of intervals).
- If tasks aren’t completed on their scheduled day, they move to the next day.

### Layers and Responsibilities

1. **Data Layer**:  
   - Uses LokiJS (in-memory), IndexedDB (persistent in-browser), and communicates with MongoDB (cloud).  
   - Provides simple functions to get and save data without worrying about how the data is stored or synced.

2. **Service Layer**:  
   - Contains the main logic.  
   - Calculates next review times, generates daily tasks, updates word progress.  
   - Calls the Data Layer to read/write data.

3. **UI Layer (e.g., Next.js)**:  
   - Displays the words and tasks to the user.  
   - Calls the Service Layer to get today’s tasks or mark a word as completed.  
   - Doesn’t handle the data details directly.

### Example File Naming

If initially putting everything in a single file, consider a name like `studyManager.ts`. It suggests the file manages the core logic, data, and syncing.

---

This is a simplified guide. It outlines the purpose of each component, how data flows, and how your study data is managed and synchronized between local memory, the browser’s IndexedDB, and the cloud (MongoDB).