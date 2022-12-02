FROM openjdk:11 AS TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY apishop/build.gradle apishop/settings.gradle apishop/gradlew $APP_HOME
COPY apishop/gradle $APP_HOME/gradle
COPY . .
RUN ./gradlew build --stacktrace -x test
#juste Pour testerrfere
FROM openjdk:17
ENV ARTIFACT_NAME=covid-api-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 8080
CMD ["java","-jar","/usr/app/covid-api-0.0.1-SNAPSHOT.jar"]
