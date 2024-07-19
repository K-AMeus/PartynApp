# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Gradle files and the Gradle wrapper
COPY build.gradle settings.gradle /app/
COPY gradlew /app/
COPY gradle /app/gradle

# Copy the project source code
COPY src /app/src
COPY spec /app/spec

# Make the Gradle wrapper executable
RUN chmod +x gradlew

# Build the application using the Gradle wrapper
RUN ./gradlew clean build

# Copy the built JAR file to the container
COPY build/libs/Partyn-app-1.0.0.jar /app/Partyn-app-1.0.0.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "Partyn-app-1.0.0.jar"]
