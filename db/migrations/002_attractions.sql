-- Phase 2D: Attractions CMS fields
ALTER TABLE attractions
  ADD COLUMN IF NOT EXISTS slug VARCHAR(180) NULL AFTER id,
  ADD COLUMN IF NOT EXISTS drive_time VARCHAR(120) NULL AFTER distance,
  ADD COLUMN IF NOT EXISTS best_time_to_visit VARCHAR(255) NULL AFTER drive_time,
  ADD COLUMN IF NOT EXISTS maps_url VARCHAR(1000) NULL AFTER best_time_to_visit;
