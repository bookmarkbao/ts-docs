**3-Minute Quick Start Guide to LokiJS**

LokiJS is a lightweight, in-memory JavaScript database that enables rapid development of small to medium-scale applications without setting up a full-fledged DB server. It’s ideal for prototyping, running quick tests, or building browser-based apps that need a fast and simple data store.

**Key Features**:  
- **In-memory Database**: All data is stored in memory for lightning-fast reads/writes.  
- **Document Store**: Data is organized into collections of JSON documents.  
- **Easy Persistence**: Optionally save and load data from files or LocalStorage.  
- **No Setup Required**: Just install and start using directly in your project.

### Step 1: Installation
If you’re using Node.js, install LokiJS from NPM:
```bash
npm install lokijs
```

If you’re working in the browser, you can include the LokiJS script directly from a CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/lokijs@latest/build/lokijs.min.js"></script>
```

### Step 2: Create a Database
Create a new Loki database instance in your Node.js or browser environment:
```js
// Node.js example
const loki = require('lokijs');
const db = new loki('example.db');

// Browser example (if included via <script> tag)
// const db = new loki('example.db');
```

### Step 3: Add a Collection
Collections are like tables, but for JSON documents. If the collection doesn’t exist, Loki will create it:
```js
const users = db.addCollection('users');
```

### Step 4: Insert Documents
Add data as plain JavaScript objects:
```js
users.insert({ name: 'Alice', age: 30 });
users.insert({ name: 'Bob', age: 25 });
```

### Step 5: Query the Database
Use `find` to retrieve multiple documents and `findOne` to fetch a single match:
```js
// Get all users under 30
const youngUsers = users.find({ age: { '$lt': 30 } });  
console.log(youngUsers);

// Get a user by name
const alice = users.findOne({ name: 'Alice' });
console.log(alice);
```

### Step 6: Update and Remove Documents
Loki returns live references, so you can modify documents directly and then call `users.update()`:
```js
alice.age = 31;  
users.update(alice);
```

To remove a document:
```js
users.remove(alice);
```

### Step 7: Persistence
To save the database to a file or local storage (for Node.js):
```js
db.saveDatabase((err) => {
  if (err) console.error("Error saving database:", err);
  else console.log("Database saved!");
});
```

In the browser, you might use `localforage` or built-in `localStorage`:
```js
db.saveDatabase();
```

When you reload your app, just call `db.loadDatabase()` with a callback to restore data:
```js
db.loadDatabase({}, () => {
  const users = db.getCollection('users');
  console.log('Data reloaded:', users.find());
});
```

**That’s it!** In just a few minutes, you’ve learned the basics of creating a LokiJS database, adding data, querying, updating, and saving it. You’re now ready to start building fast, lightweight apps that don’t require heavy database infrastructure.