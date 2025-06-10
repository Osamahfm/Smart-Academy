// routes/users.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/usersController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login/admin', loginUser); // Admin login can be handled similarly

router.post('/',async (req, res) => {
  let category= new Category({
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    image: req.body.image
  })
  category = await category.save();
  if(!category) {
    return res.status(500).json({ message: 'The category cannot be created' });
  }
  res.send(category);

})
router.get('/',async(req,res)=>{
  const userList= await User.find().select('-password');
  if(!userList) {
    return res.status(500).json({ success: false });
  }
  res.send(userList);

})

router.get('/:id',async(req,res)=>{
  const user= await User.findById(req.params.id).select('-password');
  if(!user) {
    return res.status(500).json({ message: 'The user with the given ID was not found.' });
  }
  res.send(user);

})
router.get('/:id',async(req,res)=>{
  const user= await User.findById(req.params.id);
  if(!user) {
    return res.status(500).json({ message: 'The user with the given ID was not found.' });
  }
  res.send(user);

})


router.get('/', protect, admin, getUsers);

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;

router.put('/:id', protect, admin, updateUser);
router.get('/count', protect, admin, getUserCount);
