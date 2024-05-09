import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('4337f8c3-22ed-4114-8e46-ebd5ffe01232', '1Casandra87@gmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('634bebb0-e7ac-4eba-a0bc-98d4c2461c92', '7Duane.MacGyver93@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=9', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('5db3342a-6682-4683-9815-9d183f72b7c3', '13Rodger_Bechtelar62@gmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=15', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('0465e029-1f86-4bd7-b502-6943d0d3121c', '19Tyson11@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=21', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('06626011-68e2-4a36-a06c-2e6b53fbf805', '25Oswaldo_Greenfelder@gmail.com', 'Eva Garcia', 'https://i.imgur.com/YfJQV5z.png?id=27', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('7ff405df-0008-446b-9aca-266b139f2cc4', '31Kayla87@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=33', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('c7a93824-ac5d-4e4f-afc1-836669ec76d3', '43Brendan.Cassin@hotmail.com', 'Cathy Brown', 'https://i.imgur.com/YfJQV5z.png?id=45', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('abec2e6f-df49-4e68-a9b5-57dd76f0495b', '49Matteo_Hahn29@gmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('077a5a16-3cc5-4fe4-88cc-c2e2033f0ed6', '55Isabel55@gmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=57', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a3a2e360-872f-4b84-b62f-04c3ea2548de', 'Task Assignment', 'A new task has been assigned to your team.', 'John Doe', '64Alice36@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=65', 'https://i.imgur.com/YfJQV5z.png?id=66', '7ff405df-0008-446b-9aca-266b139f2cc4');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('09840f0a-df64-4eaa-8043-2b1c95bc6ce2', 'Task Assignment', 'Monthly fuel expenses report is now available.', 'John Doe', '71Cicero24@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=72', 'https://i.imgur.com/YfJQV5z.png?id=73', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('9b039a60-6bc1-491a-9f59-ac9df71a274d', 'Maintenance Alert', 'Monthly fuel expenses report is now available.', 'Jane Smith', '78Lonzo_King@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=79', 'https://i.imgur.com/YfJQV5z.png?id=80', '634bebb0-e7ac-4eba-a0bc-98d4c2461c92');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('622e12bd-4406-4c8a-9d83-0babbfb61d23', 'Vehicle Allocation', 'Monthly fuel expenses report is now available.', 'Jane Smith', '85Amanda23@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=86', 'https://i.imgur.com/YfJQV5z.png?id=87', '7ff405df-0008-446b-9aca-266b139f2cc4');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('607563e1-507c-4a99-808d-4c44180f5ae4', 'Vehicle Allocation', 'Monthly fuel expenses report is now available.', 'John Doe', '92Keith63@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=93', 'https://i.imgur.com/YfJQV5z.png?id=94', 'c7a93824-ac5d-4e4f-afc1-836669ec76d3');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('4436c6e4-ba69-43ed-8733-c9b180212e23', 'Profile Update', 'Monthly fuel expenses report is now available.', 'John Doe', '99Teagan_Kautzer@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=100', 'https://i.imgur.com/YfJQV5z.png?id=101', '077a5a16-3cc5-4fe4-88cc-c2e2033f0ed6');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('0e2829b4-061c-4301-916d-67ece992a236', 'Maintenance Alert', 'A new task has been assigned to your team.', 'Alice Brown', '106Reid85@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=107', 'https://i.imgur.com/YfJQV5z.png?id=108', '06626011-68e2-4a36-a06c-2e6b53fbf805');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('17c42d37-acfb-4459-a63f-d7d451fa0ac8', 'Profile Update', 'A vehicle has been allocated to your department.', 'Alice Brown', '113Kaela39@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=114', 'https://i.imgur.com/YfJQV5z.png?id=115', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f7f98896-142b-4549-80d0-848d2eea737c', 'Fuel Expense Report', 'A new task has been assigned to your team.', 'Tom Wilson', '120Randall_Simonis@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=121', 'https://i.imgur.com/YfJQV5z.png?id=122', '5db3342a-6682-4683-9815-9d183f72b7c3');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('23e465ec-2c35-4126-b45f-78fe0db6a8c6', 'Profile Update', 'Monthly fuel expenses report is now available.', 'Mike Johnson', '127Courtney29@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=128', 'https://i.imgur.com/YfJQV5z.png?id=129', '634bebb0-e7ac-4eba-a0bc-98d4c2461c92');

INSERT INTO "role" ("id", "name") VALUES ('71241fd8-925c-48da-9671-aea418674340', 'Administrator');
INSERT INTO "role" ("id", "name") VALUES ('a4d7cb42-e4bc-4e7c-961c-00bbc464a0c9', 'Fleet Manager');
INSERT INTO "role" ("id", "name") VALUES ('51c2c3bd-3aea-4f8d-8495-183b0506e61d', 'Fleet Manager');
INSERT INTO "role" ("id", "name") VALUES ('425bfb03-bb50-444d-8aa6-7fc76e01d1fc', 'Maintenance Technician');
INSERT INTO "role" ("id", "name") VALUES ('51b759ef-8f6a-4f20-8642-e3c58ecf1b52', 'Administrator');
INSERT INTO "role" ("id", "name") VALUES ('9c2231eb-5ab1-436c-aba7-5cafb7d6c737', 'Administrator');
INSERT INTO "role" ("id", "name") VALUES ('69dda5cf-f4bb-45d2-8bda-6bebbcb01249', 'User');
INSERT INTO "role" ("id", "name") VALUES ('c8e4ebae-3646-4e19-8eaf-269fd8f09e45', 'Fleet Administrator');
INSERT INTO "role" ("id", "name") VALUES ('39ba1c44-9da5-4e67-acb2-094731e891ce', 'Fleet Manager');
INSERT INTO "role" ("id", "name") VALUES ('925d3da9-ef24-44ab-a270-5e7d81a59c5f', 'Maintenance Technician');

INSERT INTO "permission" ("id", "name") VALUES ('56a83137-4fec-4680-9d72-5b88e20bc340', 'Schedule Maintenance');
INSERT INTO "permission" ("id", "name") VALUES ('e92d893b-53a0-40ac-8b55-a624eac935a7', 'View Profile');
INSERT INTO "permission" ("id", "name") VALUES ('25c4d6ef-b919-456d-afc3-044a029d30af', 'Schedule Maintenance');
INSERT INTO "permission" ("id", "name") VALUES ('d9567a3b-1573-474e-8203-c1e3f48d626a', 'Create Accounts');
INSERT INTO "permission" ("id", "name") VALUES ('a1a3a982-ba72-4df2-b896-e9ad93c70e6b', 'View Profile');
INSERT INTO "permission" ("id", "name") VALUES ('648283f4-c6d8-493b-9871-fd0ff9feb346', 'View Profile');
INSERT INTO "permission" ("id", "name") VALUES ('6b13db06-a032-47c7-8557-44bbeb2034b5', 'View Profile');
INSERT INTO "permission" ("id", "name") VALUES ('5f64c138-5beb-4cd2-90a1-088a2cf0fad1', 'View Alerts');
INSERT INTO "permission" ("id", "name") VALUES ('e6d86258-33f3-47b8-8ef8-d4d820b25f62', 'Create Accounts');
INSERT INTO "permission" ("id", "name") VALUES ('2cdd05eb-9387-4c52-959a-73f62f2e835a', 'View Profile');

INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('39ba1c44-9da5-4e67-acb2-094731e891ce', 'e6d86258-33f3-47b8-8ef8-d4d820b25f62', 'e38c55ee-ea08-4071-8ea5-7a73ad11c2fb');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('9c2231eb-5ab1-436c-aba7-5cafb7d6c737', '56a83137-4fec-4680-9d72-5b88e20bc340', 'c8f47621-d1d5-4d5d-9f3f-f557a07edce3');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('51c2c3bd-3aea-4f8d-8495-183b0506e61d', '25c4d6ef-b919-456d-afc3-044a029d30af', 'ff6e39e5-4659-4037-8972-56d1cff60afb');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('a4d7cb42-e4bc-4e7c-961c-00bbc464a0c9', 'e92d893b-53a0-40ac-8b55-a624eac935a7', '24e7b2e5-080e-44e1-a97a-4e8dd8c79865');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('a4d7cb42-e4bc-4e7c-961c-00bbc464a0c9', 'a1a3a982-ba72-4df2-b896-e9ad93c70e6b', '515feb49-d8fb-4f80-8b8a-51ff0a6858cd');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('9c2231eb-5ab1-436c-aba7-5cafb7d6c737', 'e92d893b-53a0-40ac-8b55-a624eac935a7', '9eeb15a2-76f6-44cc-b551-01422f415b3b');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('51c2c3bd-3aea-4f8d-8495-183b0506e61d', '2cdd05eb-9387-4c52-959a-73f62f2e835a', '8be12b73-a6ff-4fff-a6a2-9d8b0bd946c2');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('51c2c3bd-3aea-4f8d-8495-183b0506e61d', 'e6d86258-33f3-47b8-8ef8-d4d820b25f62', 'f7d81e98-e22f-4afd-a5cb-7ad53682f2cb');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('69dda5cf-f4bb-45d2-8bda-6bebbcb01249', 'e92d893b-53a0-40ac-8b55-a624eac935a7', 'e320189e-dece-4e66-9ce6-af11fccd0f78');
INSERT INTO "role_permission" ("roleId", "permissionId", "id") VALUES ('39ba1c44-9da5-4e67-acb2-094731e891ce', 'd9567a3b-1573-474e-8203-c1e3f48d626a', '3558e9c7-b075-48fc-8a1f-1aed4bb711c8');

INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('1e8f1b61-38dc-4d0e-a471-a35f8c40ea66', 'Sedan');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('2751dcf2-54ac-48bd-a6f7-6aa2e2882a24', 'Sedan');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('b4db6367-2c50-4ce0-9499-3e91cfd0ed52', 'Truck');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('272ab0c2-373c-481b-be23-04035062c535', 'Truck');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('ccf1e5f3-f79b-488f-bfcc-cf5ebd63c33b', 'Sedan');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('54d0e51f-68b5-40bd-bc0b-7e9b457327f2', 'Van');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('e467d3e6-cefd-4c2f-ac25-ae58cb8a6dda', 'Sedan');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('69ff9d62-09df-4cc0-8c5b-ef91a3eaca0d', 'Electric');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('ba2708b7-8913-4e31-9f7b-39ad4c384f3e', 'Sedan');
INSERT INTO "vehicle_type" ("id", "typeName") VALUES ('64aa8e45-8d4f-4193-9f91-645af09b5301', 'Truck');

INSERT INTO "department" ("id", "name") VALUES ('a4eac9ed-9404-4229-96be-51fd447fdafd', 'Parks and Recreation');
INSERT INTO "department" ("id", "name") VALUES ('4829ee1d-7b19-436c-af1d-480270f1820d', 'Emergency Services');
INSERT INTO "department" ("id", "name") VALUES ('6f4854e5-6d24-409e-818a-3fa884d4453f', 'Emergency Services');
INSERT INTO "department" ("id", "name") VALUES ('87c5f1b9-e790-49ac-8485-5cd32b911f49', 'Sanitation');
INSERT INTO "department" ("id", "name") VALUES ('7172ad2c-2516-404d-8cba-02c0dd935a93', 'Sanitation');
INSERT INTO "department" ("id", "name") VALUES ('86a34367-83eb-4f0d-8eee-02a54af3ffa9', 'Sanitation');
INSERT INTO "department" ("id", "name") VALUES ('8b16017d-7300-43d3-9f35-c565b040bb22', 'Emergency Services');
INSERT INTO "department" ("id", "name") VALUES ('1c0574de-a777-412b-ace7-103a527f0155', 'Public Works');
INSERT INTO "department" ("id", "name") VALUES ('cf4ca4f8-1def-42da-b621-6117a1dd2da0', 'Emergency Services');
INSERT INTO "department" ("id", "name") VALUES ('ccfa2d84-869c-411c-90b4-cef55ac023aa', 'Public Works');

INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('2b610bf7-7e36-470e-86d1-6b596c01282c', 'XYZ789', 'Honda Civic', 1, '54d0e51f-68b5-40bd-bc0b-7e9b457327f2', 'a4eac9ed-9404-4229-96be-51fd447fdafd');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('fa19909a-d6e3-4174-a9aa-7b939679be89', 'GHI567', 'Ford Focus', 866, 'ccf1e5f3-f79b-488f-bfcc-cf5ebd63c33b', '8b16017d-7300-43d3-9f35-c565b040bb22');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('17409022-0f0a-4ef8-92a6-4c968b59e6d5', 'JHN456', 'Nissan Altima', 950, 'e467d3e6-cefd-4c2f-ac25-ae58cb8a6dda', '6f4854e5-6d24-409e-818a-3fa884d4453f');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('06297edd-b6c5-4ace-a012-776326eb4437', 'GHI567', 'Nissan Altima', 854, '69ff9d62-09df-4cc0-8c5b-ef91a3eaca0d', '7172ad2c-2516-404d-8cba-02c0dd935a93');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('c1e865e7-6a47-4584-bd11-d3c6504dce5e', 'ABC123', 'Ford Focus', 526, 'ccf1e5f3-f79b-488f-bfcc-cf5ebd63c33b', '87c5f1b9-e790-49ac-8485-5cd32b911f49');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('30207e55-4113-4439-89dc-7a233138fc15', 'GHI567', 'Ford Focus', 97, '272ab0c2-373c-481b-be23-04035062c535', '6f4854e5-6d24-409e-818a-3fa884d4453f');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('707c8e67-fa18-4b41-a23c-6929ab493314', 'JHN456', 'Ford Focus', 842, 'e467d3e6-cefd-4c2f-ac25-ae58cb8a6dda', '4829ee1d-7b19-436c-af1d-480270f1820d');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('580e3a0e-97a6-4ac2-963f-6b1cfc644dab', 'XYZ789', 'Chevrolet Malibu', 624, 'e467d3e6-cefd-4c2f-ac25-ae58cb8a6dda', '6f4854e5-6d24-409e-818a-3fa884d4453f');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('f1317405-9280-424c-aacf-0d7ca6d5d031', 'XYZ789', 'Ford Focus', 636, '1e8f1b61-38dc-4d0e-a471-a35f8c40ea66', 'cf4ca4f8-1def-42da-b621-6117a1dd2da0');
INSERT INTO "vehicle" ("id", "licensePlate", "model", "year", "vehicleTypeId", "departmentId") VALUES ('c53e2bfa-7dea-481a-872b-3e60ff7095f5', 'GHI567', 'Ford Focus', 806, '272ab0c2-373c-481b-be23-04035062c535', '8b16017d-7300-43d3-9f35-c565b040bb22');

INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('fde8b440-7360-450a-a721-9c34dd4f15ca', 'Routine oil change', '2024-05-21T10:13:40.478Z', 'Pending', '7ff405df-0008-446b-9aca-266b139f2cc4', '707c8e67-fa18-4b41-a23c-6929ab493314');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('d642387c-73f6-4360-9911-101a6869fe69', 'Replace brake pads', '2025-01-15T00:03:41.219Z', 'Overdue', 'c7a93824-ac5d-4e4f-afc1-836669ec76d3', 'c1e865e7-6a47-4584-bd11-d3c6504dce5e');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('18ed6a26-94df-4a39-882d-363c75955b78', 'Annual vehicle safety inspection', '2023-10-21T15:37:49.325Z', 'Overdue', '634bebb0-e7ac-4eba-a0bc-98d4c2461c92', '580e3a0e-97a6-4ac2-963f-6b1cfc644dab');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('9768812d-fd20-4e2c-8783-123061e54c40', 'Annual vehicle safety inspection', '2025-02-05T03:39:52.126Z', 'Scheduled', 'abec2e6f-df49-4e68-a9b5-57dd76f0495b', '06297edd-b6c5-4ace-a012-776326eb4437');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('87dcabbd-45ba-47db-9ded-77a27d30c5a1', 'Check engine light diagnostic', '2024-09-25T15:32:18.075Z', 'Scheduled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '17409022-0f0a-4ef8-92a6-4c968b59e6d5');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('d5d863c1-0aa8-42f5-9239-f108cd3c62fe', 'Annual vehicle safety inspection', '2024-03-03T03:50:45.790Z', 'Pending', 'abec2e6f-df49-4e68-a9b5-57dd76f0495b', 'c53e2bfa-7dea-481a-872b-3e60ff7095f5');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('8ca34f4b-be72-438d-92b8-bc578c44307d', 'Routine oil change', '2024-11-29T06:56:31.429Z', 'Overdue', '077a5a16-3cc5-4fe4-88cc-c2e2033f0ed6', '707c8e67-fa18-4b41-a23c-6929ab493314');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('11db3864-7ba8-4e0c-8113-d6d67c89bd55', 'Annual vehicle safety inspection', '2023-12-29T14:08:57.193Z', 'Scheduled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'c53e2bfa-7dea-481a-872b-3e60ff7095f5');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('1f01cbaa-326b-40d4-a03a-5491cf19f4d7', 'Replace brake pads', '2023-05-12T15:53:05.582Z', 'In Progress', '077a5a16-3cc5-4fe4-88cc-c2e2033f0ed6', '06297edd-b6c5-4ace-a012-776326eb4437');
INSERT INTO "task" ("id", "description", "dueDate", "status", "assignedUserId", "vehicleId") VALUES ('49d64cb0-75f5-4abd-9a37-216145077429', 'Routine oil change', '2024-12-30T13:15:30.282Z', 'Pending', '0465e029-1f86-4bd7-b502-6943d0d3121c', '30207e55-4113-4439-89dc-7a233138fc15');

INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('ed057ffc-f19e-4719-b812-f2fe1f8e9faa', '2023-12-15T12:16:28.406Z', 'In Progress', 'Engine Repair', '17409022-0f0a-4ef8-92a6-4c968b59e6d5', 'c7a93824-ac5d-4e4f-afc1-836669ec76d3');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('1dc1462a-cefe-4d69-aade-1661522b0fe3', '2024-01-27T02:25:42.212Z', 'Scheduled', 'Tire Replacement', '2b610bf7-7e36-470e-86d1-6b596c01282c', '5db3342a-6682-4683-9815-9d183f72b7c3');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('da2334e9-c46c-4c49-8f4d-a916d90aa4ab', '2024-09-26T13:05:01.719Z', 'Completed', 'Engine Repair', 'fa19909a-d6e3-4174-a9aa-7b939679be89', 'c7a93824-ac5d-4e4f-afc1-836669ec76d3');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('67e9ef73-cfb7-4e68-ab86-28f2c705467d', '2024-11-06T08:31:52.837Z', 'In Progress', 'Routine Check', 'f1317405-9280-424c-aacf-0d7ca6d5d031', 'abec2e6f-df49-4e68-a9b5-57dd76f0495b');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('c94755ff-792a-444c-b88e-c94ffc5cc989', '2024-04-12T15:44:44.021Z', 'Cancelled', 'Routine Check', '580e3a0e-97a6-4ac2-963f-6b1cfc644dab', '0465e029-1f86-4bd7-b502-6943d0d3121c');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('f52b8ac8-fc53-4a9d-a583-64a5afd8dd45', '2024-01-02T23:18:58.444Z', 'In Progress', 'Brake Inspection', 'c1e865e7-6a47-4584-bd11-d3c6504dce5e', '7ff405df-0008-446b-9aca-266b139f2cc4');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('32052c1a-c44e-4062-b6b7-a2fc7d8a8377', '2024-09-25T14:38:38.017Z', 'In Progress', 'Brake Inspection', '30207e55-4113-4439-89dc-7a233138fc15', '0465e029-1f86-4bd7-b502-6943d0d3121c');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('ef7f1095-e003-441d-8144-1d2552953f2f', '2024-09-26T01:33:29.896Z', 'Scheduled', 'Tire Replacement', 'f1317405-9280-424c-aacf-0d7ca6d5d031', '077a5a16-3cc5-4fe4-88cc-c2e2033f0ed6');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('386c9a24-cec3-435f-976c-49e6dada35ee', '2024-11-27T01:42:20.817Z', 'Cancelled', 'Engine Repair', '2b610bf7-7e36-470e-86d1-6b596c01282c', '0465e029-1f86-4bd7-b502-6943d0d3121c');
INSERT INTO "maintenance" ("id", "scheduleDate", "status", "type", "vehicleId", "technicianId") VALUES ('44ed4564-b518-427e-bd24-8a43f82419c2', '2023-06-02T06:46:48.134Z', 'Delayed', 'Engine Repair', '2b610bf7-7e36-470e-86d1-6b596c01282c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('3eb37ca7-d44b-4b60-94c6-e5957e019c8d', 'Tire tread depth below safe threshold in Vehicle ID 401', 'Moderate', '06297edd-b6c5-4ace-a012-776326eb4437');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('19099d17-a4e8-4bda-928d-8e6112f1365a', 'Battery health critical in Vehicle ID 315', 'Critical', 'fa19909a-d6e3-4174-a9aa-7b939679be89');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('135afe7e-f025-4f24-ba93-2388ec076489', 'Suspension check required for Vehicle ID 550', 'Critical', '06297edd-b6c5-4ace-a012-776326eb4437');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('793e5711-ee63-456c-b6ae-70f5de05298b', 'Suspension check required for Vehicle ID 550', 'High', 'fa19909a-d6e3-4174-a9aa-7b939679be89');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('66b42b32-ec3f-4bc6-810f-6324a712bf0b', 'Engine oil level low in Vehicle ID 102', 'High', '580e3a0e-97a6-4ac2-963f-6b1cfc644dab');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('7d460b75-0b2b-44ee-892f-32f55cfd6f93', 'Tire tread depth below safe threshold in Vehicle ID 401', 'Critical', 'c1e865e7-6a47-4584-bd11-d3c6504dce5e');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('b8f54a44-282c-4f70-863f-a3d45a621b21', 'Tire tread depth below safe threshold in Vehicle ID 401', 'Medium', '580e3a0e-97a6-4ac2-963f-6b1cfc644dab');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('26a9a62a-ef15-476e-86c4-c3aa993e356d', 'Tire tread depth below safe threshold in Vehicle ID 401', 'Critical', '30207e55-4113-4439-89dc-7a233138fc15');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('954ac548-9aa8-4403-b11b-2771e9647547', 'Brake pad replacement due for Vehicle ID 208', 'High', '2b610bf7-7e36-470e-86d1-6b596c01282c');
INSERT INTO "alert" ("id", "message", "criticality", "vehicleId") VALUES ('e17f6dd2-4407-4c70-8115-b3d685f635ad', 'Battery health critical in Vehicle ID 315', 'Critical', '06297edd-b6c5-4ace-a012-776326eb4437');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
