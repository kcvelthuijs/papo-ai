import express from 'express';

import { articleController } from '../Controllers/article.controller';
import { exerciseController } from '../Controllers/exercise.controller';
import { lessonController } from '../Controllers/lesson.controller';
import { weatherController } from '../Controllers/weather.controller';

const router = express.Router();
console.log('api router');

router.post('/article', articleController.getByCategory);

router.get('/lessons', lessonController.getAll);
router.post('/lesson', lessonController.getByID);

router.get('/exercises', exerciseController.getAll);
router.post('/exercise', exerciseController.getByID);
router.post('/exercisebylesson', exerciseController.getByLessonId);

router.get('/forecast', weatherController.getAll);

export default router;
