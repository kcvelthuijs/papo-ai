-- migrate:up
UPDATE "Lesson"."Lessons"
  SET image = '{portuguese.png}'
  WHERE id = 1;
  
UPDATE "Lesson"."Lessons"
  SET image = '{portuguese.png}'
  WHERE id = 2;
  
UPDATE "Lesson"."Lessons"
  SET image = '{casa.png}'
  WHERE id = 3;
  
UPDATE "Lesson"."Lessons"
  SET image = '{no-terraço.png}'
  WHERE id = 4;
  
UPDATE "Lesson"."Lessons"
  SET image = '{mulher-cafe.png}'
  WHERE id = 5;
  
UPDATE "Lesson"."Lessons"
  SET image = '{recepcionista-do-hotel.png}'
  WHERE id = 6;
  
UPDATE "Lesson"."Lessons"
  SET image = '{no-mercado.png}'
  WHERE id = 7;
  
UPDATE "Lesson"."Lessons"
  SET image = '{noticias-geral.png}'
  WHERE id = 8;
  
UPDATE "Lesson"."Lessons"
  SET image = '{noticias-nacional.png}'
  WHERE id = 9;
  
UPDATE "Lesson"."Lessons"
  SET image = '{noticias-desporto.png}'
  WHERE id = 10;
  
UPDATE "Lesson"."Lessons"
  SET image = '{noticias-tempo.png}'
  WHERE id = 11;
  

-- migrate:down

