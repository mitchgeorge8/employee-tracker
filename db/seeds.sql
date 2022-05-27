INSERT INTO department (name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
  ("Account Manager", 120000, 1),
  ("Sales Representative", 80000, 1),
  ("Lead Engineer", 120000, 2),
  ("Software Engineer", 80000, 2),
  ("Marketing Director", 120000, 3),
  ("Content Specialist", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 2, 1),
  ('Peter', 'Greenaway', 3, NULL),
  ('Derek', 'Jarman', 4, 4),
  ('Paolo', 'Pasolini', 4, 4),
  ('Heathcote', 'Williams', 5, NULL),
  ('Sandy', 'Powell', 6, 7),
  ('Emil', 'Zola', 6, 7);