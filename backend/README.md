# Spring Boot Template with JWT Authentication

This is a Spring Boot project template that includes basic JWT (JSON Web Token) authentication for securing APIs. It provides a foundation for creating secure applications with JWT authentication already set up, allowing developers to focus on building out their application logic. Role-based authentication is not implemented yet but can be added as needed.

## Features

- JWT authentication for securing endpoints.
- Spring Security configuration for protecting API routes.
- Easily customizable for any Spring Boot-based application.
- Provides authentication and token validation logic.
- Lightweight, making it an excellent starting point for any REST API project.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
You can use any version you need.But used compatible versions.
Below are recommended settings for quick start
- **Java 17** or higher
- **Maven** 
- **MySQL** or any database (configurable)

## Getting Started

To get started with the template, follow the steps below.

### 1. Clone the repository

```bash
https://github.com/HironKanishka97/spring-security-with-jwt.git
```

### 2. Configure MySQL (or your preferred database)
Update the src/main/resources/application.properties file with your database connection details.
```
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
### 1. Build and Run

```bash
mvn clean install
mvn spring-boot:run

```

## Dependencies

This template uses the following main dependencies:

- **Spring Boot**: Core framework.
- **Spring Security**: For securing API endpoints.
- **JWT (io.jsonwebtoken)**: For handling JWT creation and validation.
- **Spring Data JPA**: For interacting with the database.
- **MySQL Driver**: For MySQL database connectivity.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue for any bug reports or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Authors

👤 **Hiron Kanishka**

- GitHub: [@hironkanishka](https://linkedin.com/in/hiron-kanishka)
- LinkedIn: [Hiron Kanishka](https://www.linkedin.com/in/hiron-kanishka/)


## Show your support

Give a ⭐️ if you like this project!