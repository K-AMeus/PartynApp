FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . /app

RUN ./mvnw package

CMD ["java", "-jar", "target/your-spring-boot-app.jar"]

EXPOSE 8080
