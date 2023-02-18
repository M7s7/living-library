
# Living Library

Web scraper and reading list database tool for online user-generated literature. 

<div align="center">
	<img src="https://i.ibb.co/RHJ3bNb/demo.gif" width="100%"/>
</div>

## Description

Living Library is a reading list tool that allows the user to add, update, favourite or otherwise mark works of literature published on user-generated literature platforms. Users can filter saved works, and search by author, title or tags. Living Library stores and displays metadata about these works obtained through web-scraping.

The application supports the creation of user accounts via local authentication. Each account has an exclusive reading list. Multi-tenancy is implemented via the use of account-specific fields on database entries. 

At this stage, [Archive of Our Own](https://archiveofourown.org/) is the only repository that is currently supported. 

Living Library is built using the MERN stack, and styled with Tailwind CSS.

## Getting Started

### Installing
1.  If you don't have one, create a free database on [MongoDB](https://www.mongodb.com/database/free). 
2.  Clone the repo: 
	```
	git clone https://github.com/M7s7/living-library.git
	``` 
3. Install dependencies:
	```
	cd living-library/client
	npm install
	cd ../server
	npm install
	```
4. Create `.env` files in the roots of both the `client` and `server` directories. At this stage, only one online repository, `https://archiveofourown.org/`, is supported. 

	In the `client` directory, create this `.env` file:
	```
	REACT_APP_SERVER_URL = "http://localhost:3001"
	REACT_APP_WORK_URL = "https://archiveofourown.org/works"
	REACT_APP_USER_URL = "https://archiveofourown.org/users"
	```
	In the `server` directory, create this `.env` file:
	```
	MONGO_PASSWORD= <your MongoDB password here>
	MONGO_URI= <your connection string here>
	SESSION_SECRET= <your session secret here>
	SOURCE_WEBSITE="https://archiveofourown.org/works"
	```
	
### Executing program
The app is now ready for deployment. Use `npm start` to launch the client and `node index.js` to launch the server.

## Roadmap

There are several features that may be implemented in the future:
* A 'select all' button  to check all the checkboxes
* Sortable tables
* Pagination
* More search and filtering options
* Account deletion and password changing support
* Support for other online repositories

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
