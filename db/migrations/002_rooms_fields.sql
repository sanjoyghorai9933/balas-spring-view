-- Run this once against an existing cPanel database.
-- The main db/schema.sql already includes these fields for fresh installs.

ALTER TABLE rooms
  ADD COLUMN category VARCHAR(180) NULL AFTER name,
  ADD COLUMN subtitle VARCHAR(255) NULL AFTER category,
  ADD COLUMN long_description TEXT NULL AFTER description,
  ADD COLUMN size VARCHAR(80) NULL AFTER long_description,
  ADD COLUMN bed_type VARCHAR(180) NULL AFTER size;
