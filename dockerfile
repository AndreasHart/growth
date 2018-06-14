FROM scratch
COPY ./growth  /growth
EXPOSE 5000
CMD ["/growth"]
