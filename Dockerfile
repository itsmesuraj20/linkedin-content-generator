# Use official OpenJDK runtime as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first for better caching
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies (this will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/linkedin-content-generator-0.0.1-SNAPSHOT.jar"]
