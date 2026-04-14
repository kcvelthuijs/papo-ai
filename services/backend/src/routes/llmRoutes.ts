import express from "express";

import { ResponseController } from "../llm/controllers/response.controller";
import { conversationController } from "../llm/controllers/conversation.controller";
import { speechController } from "../llm/controllers/speech.controller";
import { xscribeController } from "../llm/controllers/xscribe.controller";
import { xlateController } from "../llm/controllers/xlate.controller";

const router = express.Router();

router.post("/response", ResponseController.sendMessage);
router.post("/conv", conversationController.create);
router.post("/conv/:conversationId/add", conversationController.addMessage);
router.post("/tts", speechController.speakMessage);
router.post("/xcribe", xscribeController.getText);
router.post("/xlate", xlateController.getTranslation);

export default router;
