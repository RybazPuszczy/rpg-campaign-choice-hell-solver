ALTER TABLE "public"."availability"
  DROP CONSTRAINT "player_availability_player_fkey";

ALTER TABLE "public"."games"
  DROP CONSTRAINT "games_gm_fkey";

DROP TABLE "public"."availability";

DROP TABLE "public"."games";

DROP TABLE "public"."players";

DROP TABLE "public"."playing";

