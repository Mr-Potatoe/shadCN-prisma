-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Choice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `choice` VARCHAR(50) NOT NULL,
    `answer` VARCHAR(50) NOT NULL,
    `file` TEXT NULL,
    `matchItem` VARCHAR(255) NULL,
    `orderPosition` INTEGER NULL,
    `tolerance` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseName` VARCHAR(255) NOT NULL,
    `passingScore` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `startTime` VARCHAR(15) NOT NULL,
    `endTime` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamSchedCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduleId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `studId` VARCHAR(50) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NULL,
    `selectedAnswers` TEXT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `selectedQuestions` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginAttempt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `macAddress` VARCHAR(17) NOT NULL,
    `loginTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(20) NOT NULL,
    `notes` TEXT NULL,
    `ipAddress` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProgramCategoryMapping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `programId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `weight` DECIMAL(5, 2) NOT NULL DEFAULT 1.00,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `file` TEXT NULL,
    `categoryId` INTEGER NOT NULL,
    `difficulty` ENUM('EASY', 'AVERAGE', 'HARD') NOT NULL DEFAULT 'AVERAGE',
    `type` ENUM('MULTIPLE_CHOICE', 'SHORT_ANSWER', 'FILL_BLANK', 'TRUE_FALSE', 'MATCHING', 'ORDERING', 'NUMERICAL') NOT NULL DEFAULT 'MULTIPLE_CHOICE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `studId` VARCHAR(50) NOT NULL,
    `score` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `percentage` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SMS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mobileNo` VARCHAR(45) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `studentId` VARCHAR(50) NULL,
    `senderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studId` VARCHAR(50) NOT NULL,
    `questionId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `choiceId` VARCHAR(255) NOT NULL DEFAULT '0',
    `hasQuiz` BOOLEAN NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studId` VARCHAR(50) NOT NULL,
    `lrn` VARCHAR(12) NOT NULL,
    `fname` VARCHAR(100) NOT NULL,
    `lname` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `mobileNo` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `address` VARCHAR(45) NULL,
    `birthDate` DATETIME(3) NULL,
    `graduated` DATETIME(3) NULL,
    `lastSchool` VARCHAR(100) NULL,
    `prefCourse` INTEGER NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Student_studId_key`(`studId`),
    UNIQUE INDEX `Student_lrn_key`(`lrn`),
    UNIQUE INDEX `Student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentDevice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studId` VARCHAR(50) NOT NULL,
    `macAddress` VARCHAR(17) NOT NULL,
    `ipAddress` VARCHAR(45) NOT NULL,
    `firstUsed` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUsed` DATETIME(3) NOT NULL,
    `nextDeviceChange` DATETIME(3) NULL,
    `deviceChanges` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `strPassword` VARCHAR(100) NOT NULL,
    `fname` VARCHAR(100) NOT NULL,
    `lname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `mobileNo` VARCHAR(45) NOT NULL,
    `level` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `UserData_username_key`(`username`),
    UNIQUE INDEX `UserData_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSchedCategory` ADD CONSTRAINT `ExamSchedCategory_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `ExamSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSchedCategory` ADD CONSTRAINT `ExamSchedCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSession` ADD CONSTRAINT `ExamSession_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgramCategoryMapping` ADD CONSTRAINT `ProgramCategoryMapping_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentDevice` ADD CONSTRAINT `StudentDevice_studId_fkey` FOREIGN KEY (`studId`) REFERENCES `Student`(`studId`) ON DELETE CASCADE ON UPDATE CASCADE;
