![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![SSMS](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)
# 📚 Library System

A full‑stack **Library Management System** built with a clear **MVC architecture**, a **React.js** frontend, and a **Spring Boot (Java)** backend connected to a **SQL Server (SSMS)** database.  
It allows you to manage books, members, and borrow/return operations in a clean and scalable way.

---

## 🧱 Project Structure

Based on your current folder layout:

```text
Library-system/
├─ .idea/                            # IDE configuration (IntelliJ)
│
├─ frontend/                         # React.js frontend (View)
│  ├─ build/                         # Production build output
│  ├─ node_modules/                  # NPM dependencies
│  ├─ public/
│  └─ src/
│     ├─ Add_book.css
│     ├─ Add_book.js                # Add Book component
│     ├─ Addmember.css
│     ├─ Addmember.js               # Add Member component
│     ├─ App.css
│     ├─ App.js                     # Main React component / routing
│     ├─ App.test.js
│     ├─ Book.json
│     ├─ Books (1).json
│     ├─ Bookslib.json
│     ├─ borrow.json
│     ├─ Borrow_return_management.css
│     ├─ Borrow_return_management.js
│     └─ Borrowform.js
│     # (plus any other components/files you add)
│
├─ src/
│  ├─ main/
│  │  ├─ java/
│  │  │  └─ com/example/Library/system/
│  │  │     ├─ Controllers/         # REST controllers (C in MVC)
│  │  │     ├─ Entities/            # JPA entities / domain models (M in MVC)
│  │  │     ├─ Repositories/        # Spring Data repositories
│  │  │     ├─ LibrarySystemApplication.java  # Spring Boot entry point
│  │  │     └─ WebConfig.java       # Web / CORS / MVC configuration
│  │  └─ resources/
│  │     └─ application.properties  # Spring Boot + SQL Server config
│  │

---

## ✨ Features

- 📖 **Book Management**
  - Create, update, delete, and list books
  - Store details such as title, author, category, and status (available/borrowed)

- 👥 **Member Management**
  - Register new members
  - Edit member details
  - View member list and related borrowing info

- 🔁 **Borrow & Return**
  - Issue books to members
  - Record returns and update availability

- 🧭 **Intuitive UI**
  - Separate pages/components for:
    - Adding books (`Add_book.js`)
    - Adding members (`Addmember.js`)
    - Borrow / return management (`Borrow_return_management.js`, `Borrowform.js`)

- 🧩 **MVC + RESTful API**
  - **Model:** Java entities mapped to SQL Server tables
  - **View:** React.js components and CSS
  - **Controller:** Spring Boot REST controllers exposing JSON APIs
- 🔐 Authentication & role‑based access (Admin / Librarian)

---

## 🏗️ Tech Stack

- 💻 **Languages:** Java (backend), JavaScript (frontend)
- 🎨 **Frontend:** React.js (Create React App style structure)
- 🔙 **Backend:** Spring Boot (Maven project)
- 🗄️ **Database:** Microsoft SQL Server (managed with SSMS)
- 🌐 **API:** REST (JSON over HTTP)

---

## 🚀 Getting Started

### 1️⃣ Backend Setup (Spring Boot + SQL Server)

#### ✅ Prerequisites

- Java JDK 17+  
- Maven  
- SQL Server installed and running  
- SSMS configured with a database

#### 🗄️ Configure SQL Server in `application.properties`

`src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=LibraryDB;encrypt=false
spring.datasource.username=YOUR_SQL_USERNAME
spring.datasource.password=YOUR_SQL_PASSWORD
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect

server.port=8080
```

> Replace `LibraryDB`, username, and password with your actual values.  
> Make sure the **SQL Server JDBC driver** dependency is included in your `pom.xml`.



```xml
<dependency>
  <groupId>com.microsoft.sqlserver</groupId>
  <artifactId>mssql-jdbc</artifactId>
  <scope>runtime</scope>
</dependency>
```

#### ▶️ Run Backend

From the project root (or inside `Library-system`):

```bash
mvnw clean install
mvnw spring-boot:run
# or if Maven is installed globally:
mvn clean install
mvn spring-boot:run
```

Backend will be available at:  
`http://localhost:8080`

---

### 2️⃣ Frontend Setup (React.js)

#### ✅ Prerequisites

- Node.js (LTS)
- npm 

#### 📦 Install & Run

```bash
cd frontend
npm install
npm start
```


## 🧱 Future Improvements

- ⏰ Due date tracking and automatic fine calculation
- 📊 Dashboard with charts (most borrowed books, active members, etc.)


## ⭐ Support

If this project is helpful:

- ⭐ Star the repo: [Library-system](https://github.com/Sadeeshana/Library-system)
- 🍴 Fork it and customize it
- 💬 Share ideas and improvements
