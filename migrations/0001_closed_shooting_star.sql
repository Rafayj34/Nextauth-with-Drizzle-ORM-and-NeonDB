CREATE TABLE "employee" (
	"employeeId" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"positionId" integer NOT NULL,
	"policyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employee_policy" (
	"ePolicyId" serial PRIMARY KEY NOT NULL,
	"organisationId" integer NOT NULL,
	"policy" json
);
--> statement-breakpoint
CREATE TABLE "operator" (
	"operatorId" serial PRIMARY KEY NOT NULL,
	"organisationId" integer NOT NULL,
	"name" varchar NOT NULL,
	"phone" varchar,
	"email" varchar,
	"website" varchar,
	"address" varchar,
	"operatingHours" varchar,
	"logoUrl" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "operator_policy" (
	"oPolicyId" serial PRIMARY KEY NOT NULL,
	"operatorId" integer NOT NULL,
	"policy" json
);
--> statement-breakpoint
CREATE TABLE "position" (
	"positionId" serial PRIMARY KEY NOT NULL,
	"operatorId" integer NOT NULL,
	"pPolicyId" integer NOT NULL,
	"title" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "position_policy" (
	"pPolicyId" serial PRIMARY KEY NOT NULL,
	"organisationId" integer NOT NULL,
	"policy" json
);
--> statement-breakpoint
CREATE TABLE "user" (
	"userId" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL
);
--> statement-breakpoint
DROP TABLE "todo" CASCADE;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_positionId_position_positionId_fk" FOREIGN KEY ("positionId") REFERENCES "public"."position"("positionId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_policyId_employee_policy_ePolicyId_fk" FOREIGN KEY ("policyId") REFERENCES "public"."employee_policy"("ePolicyId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operator_policy" ADD CONSTRAINT "operator_policy_operatorId_operator_operatorId_fk" FOREIGN KEY ("operatorId") REFERENCES "public"."operator"("operatorId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "position" ADD CONSTRAINT "position_operatorId_operator_operatorId_fk" FOREIGN KEY ("operatorId") REFERENCES "public"."operator"("operatorId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "position" ADD CONSTRAINT "position_pPolicyId_position_policy_pPolicyId_fk" FOREIGN KEY ("pPolicyId") REFERENCES "public"."position_policy"("pPolicyId") ON DELETE no action ON UPDATE no action;