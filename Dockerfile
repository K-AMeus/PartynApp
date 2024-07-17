# Use the official OpenJDK image as the base image
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Gradle wrapper files and configuration files
COPY build.gradle settings.gradle /app/
COPY gradlew /app/
COPY gradle /app/gradle

# Copy the OpenAPI specification file
COPY spec /app/spec

# Copy the source code to the container
COPY src /app/src

# Make the Gradle wrapper executable
RUN chmod +x gradlew

# Build the application using the Gradle wrapper
RUN ./gradlew build

# Copy the built JAR file to the container
COPY build/libs/Partyn-app-1.0.0.jar /app/Partyn-app-1.0.0.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "Partyn-app-1.0.0.jar"]
