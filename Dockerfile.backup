# Multi-stage build using standard images
FROM maven:3.9-openjdk-17 AS build

WORKDIR /app

# Copy pom.xml first for better Docker layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/content-generator-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the application with production profile
ENTRYPOINT ["java", "-Dserver.port=$PORT", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
