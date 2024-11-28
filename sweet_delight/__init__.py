import pymongo
import os
import logging
from pymongo.errors import OperationFailure
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

load_dotenv()


def get_mongo_db():
    """
    Establishes a connection to the MongoDB database and handles errors gracefully.
    Returns:
        mongodb (Database): The MongoDB database object if the connection is successful.
        None: If an error occurs during the connection process.
    """
    # Set up a logger for logging error messages
    logger = logging.getLogger(__name__)

    # Retrieve the MongoDB connection string from environment variables
    connection_string = os.getenv('MONGO_CONN_STR')

    try:
        # Initialize the MongoDB client with the connection string
        client = pymongo.MongoClient(connection_string, server_api=ServerApi('1'))

        try:
            # Check if the server is accessible by retrieving server information
            client.server_info()
            print("!!!!!!!!!!!!!   Connected Successfully   !!!!!!!!!!!!!")
            return client  # Return the database object for further use

        except OperationFailure as e:
            # Log any errors related to MongoDB server operations
            logger.error(f"Server operation error: {e}")

    except Exception as e:
        # Log general connection errors, such as IP not being whitelisted
        logger.error("Connection failed. Possible reasons include IP not whitelisted or remote host issues.")
        logger.error(f"Error details: {e}")


get_mongo_db()
