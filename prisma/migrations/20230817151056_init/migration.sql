-- CreateTable
CREATE TABLE `Destination` (
    `destination_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `pricePerPerson` DOUBLE NOT NULL,
    `climate` VARCHAR(191) NOT NULL, 
    `culture` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`destination_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shuttle` (
    `shuttle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `arrivalTime` DATETIME(3) NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`shuttle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- CreateTable testing
CREATE TABLE `Booking` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `date` DATETIME NOT NULL,
    `passengers` INT NOT NULL,
    `ticketType` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable testing
CREATE TABLE `bookingTBL` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `bookingId` INT NOT NULL,
    `number_of_passengers` INT NOT NULL,
    `Total_cost` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;