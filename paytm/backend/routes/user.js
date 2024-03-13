const express = require("express");
const { authenticate } = require("./auth");
const { z } = require("zod");
const { User, Accounts } = require("../db");
const app = express();

const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config");

const router = express.Router();

app.use(express.json());

const userSignup = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(3),
});

const validateSignup = (req, res, next) => {
  const { success } = userSignup.safeParse(req.body);
  if (success) {
    next();
  } else {
    return res.status(400).json({ message: "input is invalid" });
  }
};

const signinBody = z.object({
  username: z.string(),
  password: z.string().min(3).max(10),
});

const validateSignin = (req, res, next) => {
  const { success } = signinBody.safeParse(req.body);
  if (success) {
    next();
  } else {
    return res.status(400).json({ message: "input is invalid" });
  }
};

const validateUpdate = (req, res, next) => {
  const success = updateBody.safeParse(req.body);
  if (success) {
    next();
  } else {
    return res.status(401).json({ message: "input is invalid" });
  }
};

const updateBody = z.object({
  password: z.string().min(3).max(10),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

//router.get("/user", async (req, res, next) => {});

router.post("/signup", validateSignup, async (req, res) => {
  const { username, fistname, lastname, password } = req.body;
  const obj = await User.findOne({ username: req.body.username });
  if (obj) {
    res
      .status(400)
      .json({ message: "user already exists or email already taken" });
    return res;
  } else {
    const user = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    });

    const userId = user._id;
    await Accounts.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    const jwtToken = jwt.sign({ userId: userId }, JWT_TOKEN);
    res
      .status(200)
      .json({ message: "user created successfully", token: jwtToken });
    return res;
  }
});

router.post("signin", validateSignin, async (req, res) => {
  const { username, password } = req.body;
  const obj = await User.findOne({ username });
  if (!obj) {
    req.status(400).json({ message: "user not exists" });
  } else {
    if (obj.password == password) {
      const jwtToken = jwt.sign({ userId: obj._id }, JWT_TOKEN);
      return res
        .status(200)
        .json({ message: "authentication successful", jwt: jwtToken });
      next();
    } else {
      return res.status(400).json({ message: "the password is incorrect" });
    }
  }
});

router.put("/", validateUpdate, authenticate, async (req, res) => {
  // const {username,firstname,lastname,password}=await User.findOne({username:req.userId});
  // const {updated_firstname=firstname,updated_lastname=lastname,updated_password=password}=req.body;
  try {
    await User.updateOne(req.body, { _id: req.userId });
    // await User.updateOne({username:username},
    //     {
    //         $set:{
    //                 password:updated_password,
    //                 firstname:updated_firstname,
    //                 lastname:updated_lastname,
    //             }
    //     })
    // res.send(200).json({message: "updated successfully"});
  } catch (err) {
    console.log(err);
    return res.status(411).json({ message: "can not update the user data" });
  }
});

router.get("bulk/:filter", authenticate, async (req, res) => {
  const filter = req.params.filter || "";
  try {
    const filtered_user = await User.find({
      $or: [{ firstname: `/${filter}/` }, { lastname: `/${filter}/` }],
    }); //  /a/ ==> means %a% in sql   /^a/ ==> means a%  /a$/ ==> means %a
    res.status(200);
    res.json(
      filtered_user.map((user) => {
        return {
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id,
        };
      })
    );
    return res;
  } catch (err) {
    console.log(err);
    return res.json({ message: "some error occured" });
  }
});

//app.use(router);

module.exports = router;
