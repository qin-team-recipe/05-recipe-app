-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img_path` TEXT NULL,
    `introduction` TEXT NOT NULL,
    `twitter_id` VARCHAR(191) NULL,
    `instagram_id` VARCHAR(191) NULL,
    `site_url` VARCHAR(191) NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `users_email_key`(`email`),
    FULLTEXT INDEX `users_name_introduction_idx`(`name`, `introduction`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipes` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `serving_count` TINYINT UNSIGNED NOT NULL,
    `favorite_count` INTEGER UNSIGNED NOT NULL,
    `draft_flag` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    FULLTEXT INDEX `recipes_name_description_idx`(`name`, `description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_steps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `step_num` TINYINT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    FULLTEXT INDEX `recipe_steps_description_idx`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` VARCHAR(191) NOT NULL,
    `path` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    FULLTEXT INDEX `recipe_items_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `recipe_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopping_memos` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bought_flag` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopping_menus` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `recipe_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `order` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopping_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopping_menu_id` VARCHAR(191) NOT NULL,
    `recipe_item_id` INTEGER NOT NULL,
    `bought_flag` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follows` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `follower_id` VARCHAR(191) NOT NULL,
    `followed_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),

    UNIQUE INDEX `follows_follower_id_followed_id_key`(`follower_id`, `followed_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recipes` ADD CONSTRAINT `recipes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_steps` ADD CONSTRAINT `recipe_steps_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_links` ADD CONSTRAINT `recipe_links_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_images` ADD CONSTRAINT `recipe_images_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_items` ADD CONSTRAINT `recipe_items_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_memos` ADD CONSTRAINT `shopping_memos_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_menus` ADD CONSTRAINT `shopping_menus_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_menus` ADD CONSTRAINT `shopping_menus_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_items` ADD CONSTRAINT `shopping_items_shopping_menu_id_fkey` FOREIGN KEY (`shopping_menu_id`) REFERENCES `shopping_menus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_items` ADD CONSTRAINT `shopping_items_recipe_item_id_fkey` FOREIGN KEY (`recipe_item_id`) REFERENCES `recipe_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_followed_id_fkey` FOREIGN KEY (`followed_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
