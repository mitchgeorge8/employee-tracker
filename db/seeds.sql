INSERT INTO department (name)
VALUES
  ("Production"),
  ("Research & Development"),
  ("Sales"),
  ("Marketing"),
  ("Human Resources"),
  ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES
  ("Production Manager", 100000, 1),
  ("Research & Development Manager", 100000, 2),
  ("Sales Manager", 100000, 3),
  ("Marketing Manager", 100000, 4),
  ("Human Resources Manager", 100000, 5),
  ("Accounting Manager", 100000, 6),
  ("Production Engineer", 60000, 1),
  ("Design Engineer", 60000, 2),
  ("Sales Representative", 60000, 3),
  ("Content Producer", 60000, 4),
  ("Health and Safety Supervisor", 60000, 5),
  ("Financial Officer", 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, NULL),
  ('Robert', 'Bruce', 3, NULL),
  ('Peter', 'Greenaway', 4, NULL),
  ('Derek', 'Jarman', 5, NULL),
  ('Paolo', 'Pasolini', 6, NULL),
  ('Heathcote', 'Williams', 7, 1),
  ('Sandy', 'Powell', 7, 1),
  ('Emil', 'Zola', 8, 2),
  ('Sissy', 'Coalpits', 8, 2),
  ('Antoinette', 'Capet', 9, 3),
  ('Samuel', 'Delany', 9, 3),
  ('Tony', 'Duvert', 10, 4),
  ('Dennis', 'Cooper', 11, 5),
  ('Monica', 'Bellucci', 12, 6);