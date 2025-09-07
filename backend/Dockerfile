# Multi-stage build for optimized Docker image
FROM maven:3.9.9-openjdk-17-slim AS build

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
FROM openjdk:17-jdk-slim AS production

WORKDIR /app

# Create a non-root user for security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy the built JAR from the build stage
COPY --from=build /app/target/content-generator-0.0.1-SNAPSHOT.jar app.jar

# Change ownership to the non-root user
RUN chown appuser:appgroup app.jar

# Switch to non-root user
USER appuser

# Expose the port your app runs on
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8081/api/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
