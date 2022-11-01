This small app sets up an API server with MySQL database to fetch text files from remote locations, store them in DB and expose that content via the API.

To use, clone the repository and configure file in:

`apiServer/app/content-config.json`

to specify the sources from which the content should be pulled.

Then run:

`docker compose up`

Then navigate to your browser and run:

`http://127.0.0.1:8080/api/content/update`

This will load content into the database or update existing content for all entries.

To view all content, navigate to:

`http://127.0.0.1:8080/api/content`

To retrieve specific entry, navigate to:

`http://127.0.0.1:8080/api/content/about`

where "about" is the "name" specified in the json file

To delete all content, navigate to:

`http://127.0.0.1:8080/api/content/delete`
