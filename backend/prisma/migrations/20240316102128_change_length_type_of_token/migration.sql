-- DropIndex
DROP INDEX `users_role_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `tokens` MODIFY `token` VARCHAR(255) NOT NULL;
