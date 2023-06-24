/*
  Warnings:

  - You are about to alter the column `created_at` on the `favorites` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `follows` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `recipe_images` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_images` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `recipe_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `recipe_links` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_links` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `recipe_steps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_steps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `shopping_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `shopping_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `shopping_memos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `shopping_memos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `user_auth_providers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `img_path` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `introduction` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `site_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twitter_id` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `users_nickname_introduction_idx` ON `users`;

-- AlterTable
ALTER TABLE `favorites` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `follows` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `recipe_images` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipe_items` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipe_links` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipe_steps` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipes` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `shopping_items` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `shopping_memos` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `shopping_menus` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `user_auth_providers` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `users` DROP COLUMN `img_path`,
    DROP COLUMN `instagram_id`,
    DROP COLUMN `introduction`,
    DROP COLUMN `nickname`,
    DROP COLUMN `site_url`,
    DROP COLUMN `twitter_id`,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- CreateTable
CREATE TABLE `user_profiles` (
    `user_id` CHAR(25) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `img_path` TEXT NULL,
    `introduction` TEXT NOT NULL,
    `twitter_id` VARCHAR(191) NULL,
    `instagram_id` VARCHAR(191) NULL,
    `site_url` TEXT NULL,
    `follower_count` INTEGER UNSIGNED NOT NULL,
    `recipe_count` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `user_profiles_user_id_key`(`user_id`),
    FULLTEXT INDEX `user_profiles_nickname_introduction_idx`(`nickname`, `introduction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
