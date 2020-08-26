CREATE DATABASE zipcodes;

\connect zipcodes;

CREATE TABLE zip_codes(
    zipcode integer primary key,
    city varchar(50) not null,
    state varchar(2) not null,
    lat numeric(5,2) not null,
    long numeric(5,2) not null
)

-- This CSV was sourced from http://federalgovernmentzipcodes.us/
-- It was first edited to remove attributes which are not needed for this app
COPY zip_codes(zipcode, city, state, lat, long) FROM '/file/path/to/free-zipcode-database.csv' DELIMITER ',' CSV HEADER;