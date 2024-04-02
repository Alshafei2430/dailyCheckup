-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(255) NOT NULL,
    `rankType` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `militaryUnit` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `lastArrivalDate` DATETIME(3) NOT NULL,
    `durationSinceLastArrival` INTEGER NOT NULL,
    `specialization` VARCHAR(255) NOT NULL,
    `departure` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
