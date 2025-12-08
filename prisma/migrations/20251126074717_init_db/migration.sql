-- CreateTable
CREATE TABLE `users` (
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(100) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_full_name` VARCHAR(255) NULL,
    `user_gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `user_birthday` DATE NULL,
    `user_phone` VARCHAR(20) NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `user_address` VARCHAR(255) NULL,
    `user_avatar` VARCHAR(255) NULL,
    `user_avg_rating` DECIMAL(2, 1) NULL DEFAULT 0.0,
    `user_review_count` INTEGER NULL DEFAULT 0,
    `user_bio` TEXT NULL,
    `user_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_verification` ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'UNVERIFIED',
    `user_role` ENUM('LANDLORD', 'TENANT') NOT NULL,

    UNIQUE INDEX `user_name`(`user_name`),
    UNIQUE INDEX `user_phone`(`user_phone`),
    UNIQUE INDEX `user_email`(`user_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
