FROM openjdk:17-jdk-slim

WORKDIR /app

COPY build/libs/Partyn-app-1.0.0.jar /app/Partyn-app-1.0.0.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/Partyn-app-1.0.0.jar"]
