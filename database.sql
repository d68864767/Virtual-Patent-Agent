```sql
-- SQL Database for Virtual Patent Agent

-- Create Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(100),
    UserEmail VARCHAR(100),
    UserPassword VARCHAR(100),
    UserType VARCHAR(50)
);

-- Create Patents Table
CREATE TABLE Patents (
    PatentID INT PRIMARY KEY,
    UserID INT,
    PatentTitle VARCHAR(255),
    PatentDescription TEXT,
    PatentStatus VARCHAR(50),
    PatentJurisdiction VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create PriorArt Table
CREATE TABLE PriorArt (
    ArtID INT PRIMARY KEY,
    PatentID INT,
    ArtDescription TEXT,
    FOREIGN KEY (PatentID) REFERENCES Patents(PatentID)
);

-- Create PatentOffice Table
CREATE TABLE PatentOffices (
    OfficeID INT PRIMARY KEY,
    OfficeName VARCHAR(100),
    OfficeJurisdiction VARCHAR(50),
    OfficeAPI VARCHAR(255)
);

-- Create PatentApplications Table
CREATE TABLE PatentApplications (
    ApplicationID INT PRIMARY KEY,
    PatentID INT,
    OfficeID INT,
    ApplicationStatus VARCHAR(50),
    FOREIGN KEY (PatentID) REFERENCES Patents(PatentID),
    FOREIGN KEY (OfficeID) REFERENCES PatentOffices(OfficeID)
);

-- Create PatentLaws Table
CREATE TABLE PatentLaws (
    LawID INT PRIMARY KEY,
    LawJurisdiction VARCHAR(50),
    LawDescription TEXT
);
```
