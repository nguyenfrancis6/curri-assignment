# We use a fork because it supports multi-arch builds. https://github.com/baosystems/docker-postgis/pkgs/container/postgis
FROM ghcr.io/baosystems/postgis:15

LABEL description="This is the Curri Database built atop postgres."

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=curri_interview_template

VOLUME /var/lib/postgresql/data

EXPOSE 5432
