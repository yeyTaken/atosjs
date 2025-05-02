# 📌 Branch Versioning  

This document establishes the branch naming conventions for managing updates in the monorepo.  

---

## 📍 Branch Naming Structure  

### **🌍 Global Updates (Monorepo)**
- The **`main`** branch is the **stable** version of the monorepo.  
- When updating the monorepo as a whole, a new branch is created in the format:  
  ```
  main@<version>
  ```
- **Example:** `main@1.0.10`  

---

### **📦 Package Updates (`packages/*`)**
- When modifying a **specific package**, use:  
  ```
  packages/<package-name>@<version>
  ```
- **Examples:**  
  - `packages/atosjs@3.0.10`  
  - `packages/azura@2.0.0`  

---

### **📱 Application Updates (`apps/**/*`)**
- When updating an **application**, use:  
  ```
  apps/<app-name>@<version>
  ```
- **Examples:**  
  - `apps/dashboard@1.2.0`  
  - `apps/api@2.1.0`  

---

### **🧪 Test Updates (`tests/**/*`)**
- When modifying **tests**, use:  
  ```
  tests/<test-type>@<version>
  ```
- **Examples:**  
  - `tests/unit@1.0.5`  
  - `tests/integration@2.1.0`  

---

## 🚀 Organizational Rules  

- **Each update must have a dedicated branch** with its respective version.  
- **Branches should only contain changes relevant to their scope** (global, package, app, or tests).  
- **Versioning follows a semantic pattern** (`major.minor.patch`).  
- **Merges into `main` should only occur after validation** of the respective update.  

---

For any questions, contact the team! 🚀
