const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const cloudinary = require("./utils/cloudinary");

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

//register
app.post("/register", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        full_name,
        username,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// get user by id
app.get("/user", authenticateTokenMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        full_name: true,
      },
    });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

app.get("/post/user/", authenticateTokenMiddleware, async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { author_id: req.userId },
  });
  res.json({ posts });
});

// create post
app.post(
  "/post",
  authenticateTokenMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { title, content, category } = req.body;
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error uploading image" });
      }
      try {
        const post = await prisma.post.create({
          data: {
            title,
            author_id: req.userId,
            content,
            category,
            image: result.secure_url,
          },
        });
        res.json({ post });
      } catch (err) {
        console.log("Error creating post", err);
        res.status(400).json({ message: "Post creation failed" });
      }
    });
  }
);

// edit a post
app.put("/post/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const posts = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        category,
      },
    });
    res.json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// delete a book
app.delete("/post/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "deleted", posts });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get all post
app.get("/post", authenticateTokenMiddleware, async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { author_id: req.userId },
  });
  res.json({ posts });
});

// get recent post
app.get("/post/recent", authenticateTokenMiddleware, async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { author_id: req.userId },
    take: 3, // take 3 posts
    orderBy: {
      id: "desc", // take recent posts
    },
  });
  res.json({ posts });
});

// get post by id
app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    res.json({ post });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get category
app.get(
  "/post/category/:category",
  authenticateTokenMiddleware,
  async (req, res) => {
    const { category } = req.params;
    const posts = await prisma.post.findMany({
      where: { category: category, author_id: req.userId },
    });
    res.json({ posts });
  }
);

// get post by search
app.get("/post/search/:word", async (req, res) => {
  const { word } = req.params;
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: word,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: word,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  res.json({ posts });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
