INSERT INTO public.holds (
    frn,
    "holdCategoryId",
    added,
    closed,
    migrated,
    "migrationId"
)
SELECT
    1100000000 + gs AS frn,
    166 AS "holdCategoryId",
    NOW() - (random() * interval '30 days') AS added,
    NULL AS closed,
    NULL AS migrated,
    NULL AS "migrationId"
FROM generate_series(1, {{COUNT}}) gs;