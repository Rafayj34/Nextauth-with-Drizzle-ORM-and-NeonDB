import {
  serial,
  integer,
  varchar,
  text,
  json,
  pgTable,
} from "drizzle-orm/pg-core";

// Operator Table
export const operator = pgTable("operator", {
  operatorId: serial("operatorId").primaryKey(),
  userId: integer("userId").notNull().references(() => user.userId, {
    onDelete: "cascade",
  }),
  name: varchar("name").notNull(),
  phone: varchar("phone"),
  email: varchar("email"),
  website: varchar("website"),
  address: varchar("address"),
  operatingHours: varchar("operatingHours"),
  logoUrl: varchar("logoUrl"),
  description: text("description"),
  operatorPolicyId: integer("operatorPolicyId").references(() => operatorPolicy.oPolicyId),
});

// Operator Policy Table
export const operatorPolicy = pgTable("operator_policy", {
  oPolicyId: serial("oPolicyId").primaryKey(),
  policy: json("policy"),
});

// Employee Table
export const employee = pgTable("employee", {
  employeeId: serial("employeeId").primaryKey(),
  userId: integer("userId").notNull().references(() => user.userId),
  positionId: integer("positionId").notNull().references(() => position.positionId),
  policyId: integer("policyId").references(() => employeePolicy.ePolicyId),
});

// Employee Policy Table
export const employeePolicy = pgTable("employee_policy", {
  ePolicyId: serial("ePolicyId").primaryKey(),
//   organisationId: integer("organisationId").notNull(),
  policy: json("policy"),
});

// Position Table
export const position = pgTable("position", {
  positionId: serial("positionId").primaryKey(),
  operatorId: integer("operatorId").notNull().references(() => operator.operatorId),
  pPolicyId: integer("pPolicyId").notNull().references(() => positionPolicy.pPolicyId),
  title: varchar("title").notNull(),
});

// Position Policy Table
export const positionPolicy = pgTable("position_policy", {
  pPolicyId: serial("pPolicyId").primaryKey(),
//   organisationId: integer("organisationId").notNull(),
  policy: json("policy"),
});

// User Table
export const user = pgTable("user", {
  userId: serial("userId").primaryKey(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
});
