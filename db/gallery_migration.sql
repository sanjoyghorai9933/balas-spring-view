-- Gallery CMS extension for Bala's Spring View
-- Run this once in phpMyAdmin on aftahbue_balas_hotel.

ALTER TABLE gallery_images
  ADD COLUMN category VARCHAR(40) NOT NULL DEFAULT 'facilities' AFTER alt_text,
  ADD COLUMN aspect VARCHAR(20) NOT NULL DEFAULT 'landscape' AFTER category;

CREATE INDEX idx_gallery_category_active_order
  ON gallery_images (category, is_active, sort_order);
