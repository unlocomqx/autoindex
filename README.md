Automatically add an "index.php" in all directories recursively

# How to install 
npm install --save-dev ps_autoindex

# How to use it
**Command line:**  
node node_modules/ps_autoindex

**Npm script:**  
...  
"autoindex": "node node_modules/ps_autoindex/index.js",  
...  

# Ingoring folders
You can use a .gitignore file to ignore folders.  
**For example:**  
node_modules  
dist  
...