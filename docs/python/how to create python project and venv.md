# How to Create a Python Project and Virtual Environment

This guide walks you through creating a Python project, setting up a virtual environment, and solving common activation issues.

---

## Steps to Create a Python Project and Virtual Environment

### 1. Create a Project Folder
Open a terminal and run:
```bash
mkdir my_project
cd my_project
```

### 2. Create a Virtual Environment
Run the following command to create a virtual environment:
```bash
python3 -m venv venv
```

### 3. Activate the Virtual Environment
Activate the virtual environment based on your operating system:

- **Windows (PowerShell)**:
  ```powershell
  venv\Scripts\activate
  ```
- **macOS/Linux**:
  ```bash
  source venv/bin/activate
  ```

You’ll see `(venv)` at the start of your terminal, indicating the virtual environment is active.

### 4. Install Dependencies
Install any required Python packages using `pip`:
```bash
pip install <package_name>
```

### 5. Save Installed Dependencies
Save the installed packages to a `requirements.txt` file:
```bash
pip freeze > requirements.txt
```

### 6. Deactivate the Virtual Environment
After you’re done, deactivate the virtual environment:
```bash
deactivate
```

---

## Common Issue: Script Execution Policy Error on Windows
When activating the virtual environment in PowerShell, you may see this error:
```
venv\Scripts\activate : File cannot be loaded because running scripts is disabled on this system.
```

### Solution
1. Open PowerShell and check the current execution policy:
   ```powershell
   Get-ExecutionPolicy
   ```
2. If the policy is `Restricted`, change it to `RemoteSigned` for the current user:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Try activating the virtual environment again:
   ```powershell
   venv\Scripts\activate
   ```

4. If needed, revert the policy to `Restricted` after finishing your work:
   ```powershell
   Set-ExecutionPolicy Restricted -Scope CurrentUser
   ```

---

## Summary of Commands
```bash
# Create project folder
mkdir my_project
cd my_project

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# Windows (PowerShell):
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install <package_name>

# Save dependencies
pip freeze > requirements.txt

# Deactivate virtual environment
deactivate
```

With these steps, you can easily set up and manage Python projects with virtual environments.



## Installing Dependencies Using `requirements.txt`

To install the required packages specified in the `requirements.txt` file, follow these steps:

1. **Ensure Python and `pip` are installed**  
   Before starting, make sure that Python and `pip` (Python's package installer) are installed on your system. You can check by running the following commands:

   ```bash
   python --version
   pip --version
   ```

2. **Navigate to your project directory**  
   Open your terminal (Command Prompt, PowerShell, or terminal emulator) and navigate to the directory containing the `requirements.txt` file:

   ```bash
   cd /path/to/your/project
   ```

3. **Install dependencies**  
   Once you're in the project directory, use the following command to install all dependencies listed in `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

   This will automatically download and install all the packages required for your project.

4. **Verify installation**  
   After installation, you can verify that the packages were successfully installed by running:

   ```bash
   pip list
   ```

   This will display a list of all installed packages, including those specified in `requirements.txt`.

You can copy this content directly into your markdown file.