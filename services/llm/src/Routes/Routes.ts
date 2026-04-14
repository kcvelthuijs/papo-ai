import express from "express";

import { ResponseController } from "../Controllers/response.controller";
import { conversationController } from "../Controllers/conversation.controller";
import { speechController } from "../Controllers/speech.controller";
import { xscribeController } from "../Controllers/xscribe.controller";
import { xlateController } from "../Controllers/xlate.controller";

const router = express.Router();

router.post("/response", ResponseController.sendMessage);
router.post("/conv", conversationController.create);
router.post("/conv/:conversationId/add", conversationController.addMessage);
router.post("/tts", speechController.speakMessage);
router.post("/xcribe", xscribeController.getText);
router.post("/xlate", xlateController.getTranslation);

export default router;
