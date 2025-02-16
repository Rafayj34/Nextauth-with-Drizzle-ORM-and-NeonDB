ALTER TABLE "operator_policy" DROP CONSTRAINT "operator_policy_operatorId_operator_operatorId_fk";
--> statement-breakpoint
ALTER TABLE "operator" ADD COLUMN "operatorPolicyId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "operator" ADD CONSTRAINT "operator_operatorPolicyId_operator_policy_oPolicyId_fk" FOREIGN KEY ("operatorPolicyId") REFERENCES "public"."operator_policy"("oPolicyId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operator_policy" DROP COLUMN "operatorId";