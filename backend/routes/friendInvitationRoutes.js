import express from 'express';

import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import verifyToken from '../middleware/auth.js';
import { controllers } from './../controller/friendInvitation/friendInvitationControllers.js';

const validator = createValidator({});
const router = express.Router();

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
  token: Joi.string(),
});

const inviteDecisionSchema = Joi.object({
  data: { id: Joi.string().required() },
  token: Joi.string(),
});

router.post(
  '/invite',
  verifyToken,
  validator.body(postFriendInvitationSchema),
  controllers.postInvite
);

router.post(
  '/accept',
  verifyToken,
  validator.body(inviteDecisionSchema),
  controllers.postAccept
);

router.post(
  '/reject',
  verifyToken,
  validator.body(inviteDecisionSchema),
  controllers.postReject
);
export default router;
