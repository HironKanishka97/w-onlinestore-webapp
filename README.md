# W-Onlinestore -Sample Full Stack Web Application

This is a **Sample Full Stack Web Application** for **Wonlinestore**, an retail store . The project utilizes **Spring Boot** for the backend, **React** ⚛️ for the frontend, and **Spring Security with JWT Authentication** for secure user authentication and authorization.

## Technologies Used
- **Frontend**: React with Bootstrap , redux toolkit
- **Backend**: Spring Boot (Java)
- **Authentication**: Spring Security with JWT (JSON Web Token)
- **Database**: MySQL 
- **Build Tools**: Maven (for Spring Boot) and npm (for React)
- **Version Control**: Git

## Sample View of App
<img src="https://github.com/user-attachments/assets/14a818c8-4bf3-45e5-97db-70ec407298cb" width="400" height="400">

![Screenshot 2024-12-24 231808](https://github.com/user-attachments/assets/cc6cb464-fc41-472e-9878-a4296092ad91)
![Screenshot 2024-12-24 231833](https://github.com/user-attachments/assets/6f1dc2b0-4de5-4896-b53b-f5130dc2ad93)
![Screenshot 2024-12-24 231924](https://github.com/user-attachments/assets/c4312cd4-20b5-428d-81a4-b385a2c1fff7)
![Screenshot 2024-12-24 231940](https://github.com/user-attachments/assets/8f0ac4f0-e583-4179-94c2-0f66e40a2171)

### Installation Guide
### 1\. **Clone the Repositories**

Start by cloning both the backend and frontend repositories to your local machine.

*    clone https://github.com/HironKanishka97/w-onlinestore-webapp.git
    
### 2\. **Set Up Backend (Spring Boot)**

1.  **Install Java **:Ensure that **Java ** is installed on your system. You can download it from [OpenJDK](https://adoptopenjdk.net/).
    
2.  **Configure Database (MySQL)**:
    
    *   propertiesCopy codespring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
    *   spring.datasource.username=root
    *   spring.datasource.password=yourpassword
    *   spring.jpa.hibernate.ddl-auto=update
    *   spring.jpa.show-sql=true
        
3.   mvn clean install
    
4.   mvn spring-boot:runYour backend should now be running at http://localhost:8080.
    

### 3\. **Set Up Frontend (React)**

1.  **Install Node.js and npm**:Ensure that **Node.js** and **npm** are installed on your machine. You can download and install Node.js from [nodejs.org](https://nodejs.org/).
    
2.  npm install 
    
3.  npm run dev = Your frontend should now be running at http://localhost:port_number.
    

### 4\. **JWT Authentication Setup**

1.  **Backend - Spring Security Configuration**:
    
    *   The backend is configured with **Spring Security** and **JWT** for user authentication and authorization. The /login endpoint is used to authenticate users and receive a JWT token.
        
    *   The backend includes a filter (JwtAuthenticationFilter) that intercepts requests and verifies the JWT token for protected routes.
        
2.  **Frontend - React Authentication**:
    
    *   In the frontend, the login form allows users to authenticate and receive a JWT token. The token is stored in **local storage** and sent with every request that requires authentication.
        
    *   The frontend includes an **HTTP interceptor** using axios to add the JWT token to the headers of the API requests.
        
    
### 5\. **Contributing**
This project is not fully complete and need furthur adjustments.
If you'd like to contribute to this project, please follow these steps:

1.  **Fork** the repository on GitHub.
    
2.  **Create a new branch** (git checkout -b feature-branch).
    
3.  **Make your changes** to the code.
    
4.  **Commit your changes** (git commit -am 'Add new feature').
    
5.  **Push to the branch** (git push origin feature-branch).
    
6.  **Open a Pull Request** with a detailed description of your changes.
    

### 6\. **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

👤 **Hiron Kanishka**

- GitHub: [@hironkanishka](https://linkedin.com/in/hiron-kanishka)
- LinkedIn: [Hiron Kanishka](https://www.linkedin.com/in/hiron-kanishka/)

## Feedback and Contributions

If you have any feedback, suggestions, or would like to contribute to this project, your involvement is highly valued. Feel free to open an issue or submit a pull request with your ideas and enhancements. Remember, this template is a starting point, and the true magic lies in making it your own. Enjoy the journey of creating a stunning portfolio that represents your unique talents and accomplishments!

Happy coding and showcasing!

## Show your support

Give a ⭐️ if you like this project!
