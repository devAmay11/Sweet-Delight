import pymongo
import os
import logging
from pymongo.errors import OperationFailure

def get_mongodb():
    """
    Establishes a connection to the MongoDB database and handles errors gracefully.

    Returns:
        mongodb (Database): The MongoDB database object if the connection is successful.
        None: If an error occurs during the connection process.
    """
    # Set up a logger for logging error messages
    logger = logging.getLogger(__name__)

    # Retrieve the MongoDB connection string from environment variables
    mongoConnStr = os.getenv('MONGO_CONN_STR')

    try:
        # Initialize the MongoDB client with the connection string
        client = pymongo.MongoClient(mongoConnStr)

        try:
            # Check if the server is accessible by retrieving server information
            client.server_info()

            try:
                # Access the specific database ('talentkind') within MongoDB
                mongodb = client.talentkind
                return mongodb  # Return the database object for further use

            except OperationFailure as e:
                # Log any errors related to database access
                logger.error(f"Database access error: {e}")

        except OperationFailure as e:
            # Log any errors related to MongoDB server operations
            logger.error(f"Server operation error: {e}")

    except Exception as e:
        # Log general connection errors, such as IP not being whitelisted
        logger.error("Connection failed. Possible reasons include IP not whitelisted or remote host issues.")
        logger.error(f"Error details: {e}")


