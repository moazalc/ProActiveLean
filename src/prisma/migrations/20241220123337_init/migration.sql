-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLogin` DATETIME(3) NULL,
    `roleId` INTEGER NOT NULL,
    `avatar` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,
    `isAuditor` BOOLEAN NOT NULL,
    `canAnswer` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `type` ENUM('Factory', 'Hospital', 'Hotel') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locationCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `parentId` INTEGER NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `auditable` BOOLEAN NOT NULL,
    `responsibleUserId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `finding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` ENUM('Audit', 'Field_Tour', 'Workshop', 'Instant', 'Checklist') NOT NULL,
    `fiveSCategory` ENUM('Tertip', 'Duzen', 'Temizlik', 'Disiplin', 'Standartlastirma') NULL,
    `hseCategory` ENUM('Saglik', 'Emniyet', 'Cevre', 'Standardizasyon', 'Disiplin') NULL,
    `workshopId` INTEGER NULL,
    `answerId` INTEGER NULL,
    `fieldTourId` INTEGER NULL,
    `checklistAnswerId` INTEGER NULL,
    `status` ENUM('Open', 'Closed') NOT NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateToBeCompleted` DATETIME(3) NOT NULL,
    `findingUserId` INTEGER NOT NULL,
    `imgBefore` VARCHAR(191) NULL,
    `findingDescription` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NULL,
    `finding` VARCHAR(191) NULL,
    `completionDate` DATETIME(3) NULL,
    `actionTaken` VARCHAR(191) NULL,
    `actionUserId` INTEGER NULL,
    `imgAfter` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` ENUM('AdditionalTime', 'Deviation') NOT NULL,
    `fiveSCategory` ENUM('Tertip', 'Duzen', 'Temizlik', 'Disiplin', 'Standartlastirma') NULL,
    `hseCategory` ENUM('Saglik', 'Emniyet', 'Cevre', 'Standardizasyon', 'Disiplin') NULL,
    `status` ENUM('Open', 'Closed') NOT NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateToBeCompleted` DATETIME(3) NOT NULL,
    `requestUserId` INTEGER NOT NULL,
    `imgBefore` VARCHAR(191) NULL,
    `requestDescription` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NULL,
    `request` VARCHAR(191) NULL,
    `extensionDateRequest` DATETIME(3) NULL,
    `completionDate` DATETIME(3) NULL,
    `actionTaken` VARCHAR(191) NULL,
    `actionUserId` INTEGER NULL,
    `imgAfter` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workshop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startDate` DATETIME(3) NOT NULL,
    `completionDate` DATETIME(3) NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `responsibleUserId` INTEGER NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `completed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workshopAttendee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workshopId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attended` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `workshopAttendee_workshopId_userId_key`(`workshopId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fieldTour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `relatedPlaceId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `responsibleUserId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fieldTourAttendee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fieldTourId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attended` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `fieldTourAttendee_fieldTourId_userId_key`(`fieldTourId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fiveSCategory` ENUM('Tertip', 'Duzen', 'Temizlik', 'Disiplin', 'Standartlastirma') NULL,
    `hseCategory` ENUM('Saglik', 'Emniyet', 'Cevre', 'Standardizasyon', 'Disiplin') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `auditDate` DATETIME(3) NOT NULL,
    `completionDate` DATETIME(3) NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `responsibleUserId` INTEGER NOT NULL,
    `appointedUserId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meeting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startDate` DATETIME(3) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `responsibleUserId` INTEGER NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `completed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meetingAttendee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meetingId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attended` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `meetingAttendee_meetingId_userId_key`(`meetingId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meetingAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `meetingId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NULL,
    `requestedByUserId` INTEGER NOT NULL,
    `requestedToUserId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `fiveSCategory` ENUM('Tertip', 'Duzen', 'Temizlik', 'Disiplin', 'Standartlastirma') NULL,
    `hseCategory` ENUM('Saglik', 'Emniyet', 'Cevre', 'Standardizasyon', 'Disiplin') NULL,
    `question` VARCHAR(191) NOT NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `createdByUserId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `answer` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `answeredByUserId` INTEGER NOT NULL,
    `activityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `viewed` BOOLEAN NOT NULL,
    `roomNo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `relatedPlaceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `reviewSubjectId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklistQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NULL,
    `checklistCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklistCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `locationCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklistAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `checkbox` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,
    `activityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklistAssignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdByUserId` INTEGER NOT NULL,
    `appointedUserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateDue` DATETIME(3) NOT NULL,
    `type` ENUM('daily', 'weekly', 'monthly') NOT NULL,
    `locationCategoryId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklistActivity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `locationId` INTEGER NOT NULL,
    `assignmentId` INTEGER NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locationCategory` ADD CONSTRAINT `locationCategory_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `locationCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_responsibleUserId_fkey` FOREIGN KEY (`responsibleUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `locationCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_checklistAnswerId_fkey` FOREIGN KEY (`checklistAnswerId`) REFERENCES `checklistAnswer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `answer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_fieldTourId_fkey` FOREIGN KEY (`fieldTourId`) REFERENCES `fieldTour`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_workshopId_fkey` FOREIGN KEY (`workshopId`) REFERENCES `workshop`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_actionUserId_fkey` FOREIGN KEY (`actionUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_findingUserId_fkey` FOREIGN KEY (`findingUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finding` ADD CONSTRAINT `finding_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `request_actionUserId_fkey` FOREIGN KEY (`actionUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `request_requestUserId_fkey` FOREIGN KEY (`requestUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `request_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workshop` ADD CONSTRAINT `workshop_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workshop` ADD CONSTRAINT `workshop_responsibleUserId_fkey` FOREIGN KEY (`responsibleUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workshopAttendee` ADD CONSTRAINT `workshopAttendee_workshopId_fkey` FOREIGN KEY (`workshopId`) REFERENCES `workshop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workshopAttendee` ADD CONSTRAINT `workshopAttendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fieldTour` ADD CONSTRAINT `fieldTour_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fieldTour` ADD CONSTRAINT `fieldTour_responsibleUserId_fkey` FOREIGN KEY (`responsibleUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fieldTourAttendee` ADD CONSTRAINT `fieldTourAttendee_fieldTourId_fkey` FOREIGN KEY (`fieldTourId`) REFERENCES `fieldTour`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fieldTourAttendee` ADD CONSTRAINT `fieldTourAttendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_responsibleUserId_fkey` FOREIGN KEY (`responsibleUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_appointedUserId_fkey` FOREIGN KEY (`appointedUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meeting` ADD CONSTRAINT `meeting_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meeting` ADD CONSTRAINT `meeting_responsibleUserId_fkey` FOREIGN KEY (`responsibleUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meetingAttendee` ADD CONSTRAINT `meetingAttendee_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meetingAttendee` ADD CONSTRAINT `meetingAttendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meetingAction` ADD CONSTRAINT `meetingAction_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meetingAction` ADD CONSTRAINT `meetingAction_requestedByUserId_fkey` FOREIGN KEY (`requestedByUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meetingAction` ADD CONSTRAINT `meetingAction_requestedToUserId_fkey` FOREIGN KEY (`requestedToUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_answeredByUserId_fkey` FOREIGN KEY (`answeredByUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewSubject` ADD CONSTRAINT `reviewSubject_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewSubject` ADD CONSTRAINT `reviewSubject_relatedPlaceId_fkey` FOREIGN KEY (`relatedPlaceId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewRating` ADD CONSTRAINT `reviewRating_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewRating` ADD CONSTRAINT `reviewRating_reviewSubjectId_fkey` FOREIGN KEY (`reviewSubjectId`) REFERENCES `reviewSubject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistQuestion` ADD CONSTRAINT `checklistQuestion_checklistCategoryId_fkey` FOREIGN KEY (`checklistCategoryId`) REFERENCES `checklistCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistQuestion` ADD CONSTRAINT `checklistQuestion_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistQuestion` ADD CONSTRAINT `checklistQuestion_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistCategory` ADD CONSTRAINT `checklistCategory_locationCategoryId_fkey` FOREIGN KEY (`locationCategoryId`) REFERENCES `locationCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistAnswer` ADD CONSTRAINT `checklistAnswer_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistAnswer` ADD CONSTRAINT `checklistAnswer_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `checklistActivity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistAnswer` ADD CONSTRAINT `checklistAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `checklistQuestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistAssignment` ADD CONSTRAINT `checklistAssignment_locationCategoryId_fkey` FOREIGN KEY (`locationCategoryId`) REFERENCES `locationCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistAssignment` ADD CONSTRAINT `checklistAssignment_appointedUserId_fkey` FOREIGN KEY (`appointedUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistAssignment` ADD CONSTRAINT `checklistAssignment_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistActivity` ADD CONSTRAINT `checklistActivity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistActivity` ADD CONSTRAINT `checklistActivity_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistActivity` ADD CONSTRAINT `checklistActivity_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `checklistAssignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
