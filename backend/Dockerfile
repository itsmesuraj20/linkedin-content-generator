# Multi-stage build for optimized Docker image
FROM maven:3.8.6-openjdk-17-slim AS build

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
FROM openjdk:17-jre-slim AS production

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/content-generator-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the application with production profile
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
