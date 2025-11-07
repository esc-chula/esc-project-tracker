-- ============================================
-- Mock Data for ESC Project Tracker Database
-- ============================================
-- This file contains SQL INSERT statements for testing API endpoints
-- Run this in your PostgreSQL database after tables are created
--
-- IMPORTANT USER IDs (for testing):
-- - Admin: bb64e6eb-ad7e-4a21-a879-d0612b218996 (use this in DEV_MODE)
-- - ESC Member: aa11bb22-cc33-dd44-ee55-ff66778899aa
-- - Student: 11223344-5566-7788-99aa-bbccddeeff00
-- - ESC Member 2: ffeeddcc-bbaa-9988-7766-554433221100
--
-- IMPORTANT PROJECT IDs (for testing):
-- - Project 1 (1001): 11111111-1111-1111-1111-111111111111
-- - Project 2 (1101): 22222222-2222-2222-2222-222222222222
-- - Project 3 (1201): 33333333-3333-3333-3333-333333333333
-- - Project 7 (4001): 77777777-7777-7777-7777-777777777777
--
-- HOW TO USE:
-- 1. Make sure your database is running and tables are created
-- 2. Connect to your PostgreSQL database:
--    psql -U admin -d admin_db -h localhost -p 5432
-- 3. Run this file:
--    \i mock_data.sql
--    OR copy and paste the SQL statements

-- ============================================
-- 1. USERS TABLE
-- ============================================
-- Insert mock users (at least 2-3 users for testing)

INSERT INTO "user" (id, username, "studentId", role, "refreshToken", tel, "createdAt", "updatedAt")
VALUES
  -- User 1: Admin (use this ID in DEV_MODE: bb64e6eb-ad7e-4a21-a879-d0612b218996)
  (
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    'mockadmin',
    '6630000021',
    'admin',
    NULL,
    '0812345678',
    NOW(),
    NULL
  ),
  -- User 2: ESC Member
  (
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    'จอห์น โด',
    '6630000022',
    'esc',
    NULL,
    '0812345679',
    NOW(),
    NULL
  ),
  -- User 3: Student
  (
    '11223344-5566-7788-99aa-bbccddeeff00',
    'เจน สมิธ',
    '6630000023',
    'student',
    NULL,
    '0812345680',
    NOW(),
    NULL
  ),
  -- User 4: ESC Member (for more projects)
  (
    'ffeeddcc-bbaa-9988-7766-554433221100',
    'สมชาย ใจดี',
    '6630000024',
    'esc',
    NULL,
    '0812345681',
    NOW(),
    NULL
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. PROJECT TABLE
-- ============================================
-- Insert mock projects with different types and statuses
-- ProjectCode format: {type}{count} (e.g., "1001", "1101", "2001")

INSERT INTO "project" (id, name, "projectCode", "ownerId", type, detail, "reserveDate", status, "createdAt", "updatedAt")
VALUES
  -- Project 1: INTERNAL_AFFAIR (10) - CONTINUE
  (
    '11111111-1111-1111-1111-111111111111',
    'โครงการกิจกรรมภายใน 1',
    '1001',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '10',
    'รายละเอียดโครงการกิจกรรมภายใน 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 2: ARTS_CULTURE_AFFAIR (11) - CONTINUE
  (
    '22222222-2222-2222-2222-222222222222',
    'โครงการศิลปะและวัฒนธรรม 1',
    '1101',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '11',
    'รายละเอียดโครงการศิลปะและวัฒนธรรม 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 3: SPORTS_AFFAIR (12) - WAIT_FOR_APPROVE
  (
    '33333333-3333-3333-3333-333333333333',
    'โครงการกีฬา 1',
    '1201',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '12',
    'รายละเอียดโครงการกีฬา 1',
    CURRENT_DATE,
    'WAIT_FOR_APPROVE',
    NOW(),
    NULL
  ),
  -- Project 4: SOCIAL_SERVICE_AFFAIR (13) - CLOSED
  (
    '44444444-4444-4444-4444-444444444444',
    'โครงการพัฒนาสังคม 1',
    '1301',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '13',
    'รายละเอียดโครงการพัฒนาสังคม 1',
    CURRENT_DATE - INTERVAL '30 days',
    'CLOSED',
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '5 days'
  ),
  -- Project 5: EXTERNAL_AFFAIR (20) - CONTINUE
  (
    '55555555-5555-5555-5555-555555555555',
    'โครงการกิจการภายนอก 1',
    '2001',
    '11223344-5566-7788-99aa-bbccddeeff00',
    '20',
    'รายละเอียดโครงการกิจการภายนอก 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 6: NISITSUMPAN_AFFAIR (30) - WAIT_FOR_CLOSE
  (
    '66666666-6666-6666-6666-666666666666',
    'โครงการนิสิตสัมพันธ์ 1',
    '3001',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '30',
    'รายละเอียดโครงการนิสิตสัมพันธ์ 1',
    CURRENT_DATE - INTERVAL '10 days',
    'WAIT_FOR_CLOSE',
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '1 day'
  ),
  -- Project 7: TECH_AFFAIR (40) - CONTINUE
  (
    '77777777-7777-7777-7777-777777777777',
    'โครงการเทคโนโลยี 1',
    '4001',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '40',
    'รายละเอียดโครงการเทคโนโลยี 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 8: ORGANIZATION_AFFAIR (50) - CLOSING
  (
    '88888888-8888-8888-8888-888888888888',
    'โครงการพัฒนาองค์กร 1',
    '5001',
    '11223344-5566-7788-99aa-bbccddeeff00',
    '50',
    'รายละเอียดโครงการพัฒนาองค์กร 1',
    CURRENT_DATE - INTERVAL '5 days',
    'CLOSING',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '1 day'
  ),
  -- Project 9: PR_MARGETING_AFFAIR (60) - CONTINUE
  (
    '99999999-9999-9999-9999-999999999999',
    'โครงการประชาสัมพันธ์ 1',
    '6001',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '60',
    'รายละเอียดโครงการประชาสัมพันธ์ 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 10: ACADEMICS_AFFAIR (70) - WAIT_FOR_APPROVE
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'โครงการวิชาการ 1',
    '7001',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '70',
    'รายละเอียดโครงการวิชาการ 1',
    CURRENT_DATE,
    'WAIT_FOR_APPROVE',
    NOW(),
    NULL
  ),
  -- Project 11: OTHER_ESC (80) - CONTINUE
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'โครงการอื่นๆ 1',
    '8001',
    'ffeeddcc-bbaa-9988-7766-554433221100',
    '80',
    'รายละเอียดโครงการอื่นๆ 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 12: OFFICE_SUPPLY_AFFAIR (90) - CLOSED
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'โครงการสำนักงาน 1',
    '9001',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '90',
    'รายละเอียดโครงการสำนักงาน 1',
    CURRENT_DATE - INTERVAL '60 days',
    'CLOSED',
    NOW() - INTERVAL '60 days',
    NOW() - INTERVAL '20 days'
  ),
  -- Project 13: STUDENTS_WELFARE_ENV_AFFAIR (14) - CONTINUE
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'โครงการสวัสดิการนิสิต 1',
    '1401',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '14',
    'รายละเอียดโครงการสวัสดิการนิสิต 1',
    CURRENT_DATE,
    'CONTINUE',
    NOW(),
    NULL
  ),
  -- Project 14: TECH_AFFAIR (40) - WAIT_FOR_APPROVE (for testing filter)
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'โครงการเทคโนโลยี 2',
    '4002',
    '11223344-5566-7788-99aa-bbccddeeff00',
    '40',
    'รายละเอียดโครงการเทคโนโลยี 2',
    CURRENT_DATE,
    'WAIT_FOR_APPROVE',
    NOW(),
    NULL
  ),
  -- Project 15: INTERNAL_AFFAIR (10) - CLOSED (for testing filter)
  (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    'โครงการกิจกรรมภายใน 2',
    '1002',
    'ffeeddcc-bbaa-9988-7766-554433221100',
    '10',
    'รายละเอียดโครงการกิจกรรมภายใน 2',
    CURRENT_DATE - INTERVAL '45 days',
    'CLOSED',
    NOW() - INTERVAL '45 days',
    NOW() - INTERVAL '10 days'
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. USER_PROJ TABLE (Optional)
-- ============================================
-- Insert user-project relationships (for testing user-project associations)
-- This is optional but useful for testing findProjectsByUserId

INSERT INTO "user_proj" (id, "userId", "projectId", "lastOpen", "pinnedAt")
VALUES
  -- User 1 (admin) joins Project 1
  (
    'a1111111-1111-1111-1111-111111111111',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '11111111-1111-1111-1111-111111111111',
    NOW(),
    NULL
  ),
  -- User 1 (admin) joins Project 3
  (
    'a3333333-3333-3333-3333-333333333333',
    'bb64e6eb-ad7e-4a21-a879-d0612b218996',
    '33333333-3333-3333-3333-333333333333',
    NOW(),
    NULL
  ),
  -- User 2 joins Project 2
  (
    'a2222222-2222-2222-2222-222222222222',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '22222222-2222-2222-2222-222222222222',
    NOW(),
    NULL
  ),
  -- User 2 joins Project 7
  (
    'a7777777-7777-7777-7777-777777777777',
    'aa11bb22-cc33-dd44-ee55-ff66778899aa',
    '77777777-7777-7777-7777-777777777777',
    NOW(),
    NULL
  ),
  -- User 3 joins Project 5
  (
    'a5555555-5555-5555-5555-555555555555',
    '11223344-5566-7788-99aa-bbccddeeff00',
    '55555555-5555-5555-5555-555555555555',
    NOW(),
    NULL
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check users
SELECT id, username, "studentId", role FROM "user";

-- Check projects
SELECT id, name, "projectCode", type, status, "ownerId" FROM project ORDER BY "projectCode";

-- Check projects by user
SELECT p.id, p.name, p."projectCode", p.type, p.status, u.username as owner_name
FROM project p
JOIN "user" u ON p."ownerId" = u.id
ORDER BY p."projectCode";

-- Count projects by type
SELECT type, COUNT(*) as count
FROM project
GROUP BY type
ORDER BY type;

-- Count projects by status
SELECT status, COUNT(*) as count
FROM project
GROUP BY status
ORDER BY status;

