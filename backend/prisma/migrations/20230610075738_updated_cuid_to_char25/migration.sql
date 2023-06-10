/*
  Warnings:

  - You are about to alter the column `user_id` on the `favorites` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `recipe_id` on the `favorites` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `favorites` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `follower_id` on the `follows` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `followed_id` on the `follows` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `follows` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `recipe_id` on the `recipe_images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `recipe_images` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_images` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `recipe_id` on the `recipe_items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `recipe_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `recipe_id` on the `recipe_links` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `recipe_links` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_links` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `recipe_id` on the `recipe_steps` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `recipe_steps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipe_steps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `user_id` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `shopping_menu_id` on the `shopping_items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `shopping_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `shopping_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `shopping_memos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `shopping_memos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `user_id` on the `shopping_memos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `shopping_memos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `shopping_memos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `shopping_menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `user_id` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `recipe_id` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `shopping_menus` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_followed_id_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_follower_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipe_images` DROP FOREIGN KEY `recipe_images_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipe_items` DROP FOREIGN KEY `recipe_items_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipe_links` DROP FOREIGN KEY `recipe_links_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipe_steps` DROP FOREIGN KEY `recipe_steps_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipes` DROP FOREIGN KEY `recipes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `shopping_items` DROP FOREIGN KEY `shopping_items_shopping_menu_id_fkey`;

-- DropForeignKey
ALTER TABLE `shopping_memos` DROP FOREIGN KEY `shopping_memos_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `shopping_menus` DROP FOREIGN KEY `shopping_menus_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `shopping_menus` DROP FOREIGN KEY `shopping_menus_user_id_fkey`;

-- AlterTable
ALTER TABLE `favorites` MODIFY `user_id` CHAR(25) NOT NULL,
    MODIFY `recipe_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `follows` MODIFY `follower_id` CHAR(25) NOT NULL,
    MODIFY `followed_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `recipe_images` MODIFY `recipe_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipe_items` MODIFY `recipe_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipe_links` MODIFY `recipe_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipe_steps` MODIFY `recipe_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `recipes` DROP PRIMARY KEY,
    MODIFY `id` CHAR(25) NOT NULL,
    MODIFY `user_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `shopping_items` MODIFY `shopping_menu_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `shopping_memos` DROP PRIMARY KEY,
    MODIFY `id` CHAR(25) NOT NULL,
    MODIFY `user_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `shopping_menus` DROP PRIMARY KEY,
    MODIFY `id` CHAR(25) NOT NULL,
    MODIFY `user_id` CHAR(25) NOT NULL,
    MODIFY `recipe_id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` CHAR(25) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    ADD PRIMARY KEY (`id`);

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
ALTER TABLE `follows` ADD CONSTRAINT `follows_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_followed_id_fkey` FOREIGN KEY (`followed_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
