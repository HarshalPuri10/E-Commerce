import asyncHandler from "express-async-handler";
import { hash, genSaltSync, compare } from "bcrypt";
import { CONSTANTS } from "../../../../../configuration/config.js";
import MESSAGES from "../../../../helpers/messages.js";
import {
  createUser,
  findOneAndUpdateUser,
  findOneUser,
  getAllUserList,
  getUserById,
} from "../../../../models/auth/repository/userRepository.js";
import { outputData } from "../../../../helpers/utility.js";

export const getAll = asyncHandler(async (req, res) => {
  try {
    let project = {
      name: 1,
      email: 1,
      userType: 1,
      isActive: 1,
    };
    let rows = await getAllUserList([
      {
        $project: project,
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [],
        },
      },
    ]);
    return res.send({ ...outputData(rows) });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const create = asyncHandler(async (req, res) => {
  try {
    let userExists = await findOneUser(
      {
        email: req.body.email.toLowerCase(),
      },
      { _id: 1 }
    );
    if (userExists) {
      let error = MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("User");
      return res.preconditionFailed(error);
    }
    req.body.password = await hash(req.body.password, 10);
    const userObj = await createUser(req.body);
    if (userObj) {
      res.send({ message: MESSAGES.apiSuccessStrings.CREATE("User") });
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /v1/auth/user/login:
 *   post:
 *     description: Login
 *     parameters:
 *       - name: email
 *         in: query
 *         description: User email
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: User password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
export const login = asyncHandler(async (req, res) => {
  try {
    let existingUser = await findOneUser({
      email: req.body.email,
    });
    if (existingUser && (await existingUser.matchPassword(req.body.password))) {
      return res.send({
        _id: existingUser._id,
        token: existingUser.genToken(),
        email: existingUser.email,
        role: existingUser.role,
        message: MESSAGES.apiSuccessStrings.LOGIN("User"),
      });
    } else {
      let errors = MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User");
      return res.preconditionFailed(errors);
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
// @route   POST /api/user/
export async function update(req, res) {
  try {
    if (req.body.password) {
      req.body.password = await hash(req.body.password, genSaltSync(8));
    } else {
      delete req.body.password;
    }
    let user = await findOneAndUpdateUser({ _id: req.params.id }, req.body, {
      upsert: true,
      new: true,
      rawResult: true,
    });
    if (!user) {
      return res.preconditionFailed(errors);
    }
    res.send({
      message: MESSAGES.apiSuccessStrings.UPDATE("User"),
    });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
}
export const forgetPassword = asyncHandler(async (req, res) => {
  try {
    if (!req.body.email) {
      return res.preconditionFailed(error);
    }
    let query = {
      email: req.body.email,
    };
    let existingUser = await findOneUser(query);
    if (!existingUser) {
      return res.preconditionFailed(error);
    } else {
      existingUser.RESET_PIN = Math.floor(Math.random() * 899999 + 100000);
      let user = await existingUser.save();
      let data = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        url: `${CONSTANTS.reqURL}#/auth/change-pwd?sub=${user._id}&pin=${user.RESET_PIN}`,
      };
      mail.sendForgetMail(req, data);
      return res.send({ message: message });
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
// @route   POST /api/user/
export async function resetPassword(req, res) {
  try {
    let query = {
      _id: req.body.id,
    };
    let user = await findOneUser(query);
    if (!user) {
      return res.preconditionFailed(error);
    } else {
      let isMatch = await compare(req.body.OLD_PASSWORD, user.password);
      if (isMatch) {
        user.password = await hash(req.body.NEW_PASSWORD, genSaltSync(8));
        user.LAST_UPDATED_DATE = Date.now();
        let users = await user.save();
        /** send email to user*/
        // await EmailRepository.sendResetPassword(user);
        /** send sms to user*/
        // await SMSRepository.sendOTPMessage(user);

        return res.send({ message: message });
      } else {
        return res.preconditionFailed(errors);
      }
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
}
// @route   POST /api/user/
export async function setPassword(req, res) {
  try {
    let query = {
      _id: req.body._id,
    };
    let user = await findOneUser(query);
    if (!user) {
      return res.preconditionFailed(error);
    } else {
      if (user.RESET_PIN === req.body.RESET_PIN) {
        user.password = await hash(req.body.NEW_PASSWORD, genSaltSync(8));
        user.LAST_UPDATED_DATE = Date.now();
        user.IS_VERIFY = true;
        user.RESET_PIN = null;
        let users = await user.save();
        return res.send({ message: message });
      } else {
        return res.preconditionFailed(errors);
      }
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
}
export const deleteById = asyncHandler(async (req, res) => {
  try {
    const deleteItem = await getUserById(req.params.id);
    if (deleteItem) {
      await deleteItem.remove();
      return res.send({ message: MESSAGES.apiSuccessStrings.DELETE });
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const getById = asyncHandler(async (req, res) => {
  try {
    let existing = await findOneUser({
      _id: req.params.id,
    });
    if (!existing) {
      return res.unprocessableEntity(errors);
    }
    return res.send(existing);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});

export async function getAllUsers() {
  let rows = await Model.find({
    isActive: true,
  }).sort({ createdAt: -1 });
  return rows;
}

async function getUserMailConfig(userId, action) {
  try {
    let toEmailValue = await findAppParameterValue("ALL_SETTING_MAILS");
    let mailData = {
      templateUrl: "templates/User/userCreate.html",
      subject: null,
      toEmailValue:
        toEmailValue !== undefined
          ? toEmailValue.split(",")
          : ["nikhil@idmsinfotech.com"],
      attachments: null,
      replacement: {},
    };
    let data = await getUserMailData(userId);
    console.log("userEmail", data);
    mailData.replacement = data;
    if (action == "created") {
      (mailData.templateUrl = "templates/User/userCreate.html"),
        (mailData.subject = "User creation request Email");
      sendMail(mailData);
    }
    if (action == "Approved") {
      (mailData.templateUrl = "templates/User/userApproved.html"),
        (mailData.subject = "User Creation Request Approved");
      sendMail(mailData);
    }
  } catch (e) {
    console.error("getUserMailConfig", e);
  }
}
async function getUserMailData(userId) {
  try {
    let data = await getUserById(userId).populate("role", "roleName");
    return {
      fullName: data?.name,
      emailId: data?.userEmail,
      Username: data?.email,
      role: data?.role[0]?.roleName,
    };
  } catch (error) {
    console.log(error);
  }
}
