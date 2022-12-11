import Admin from '../../models/admin.js'

export const login = async(req,res)=>{
  try {
    const { username, password } = req.body
    const result = await Admin.findOne({username})
    if (!result) {
      res.status(404).json({message: "User not exist!"})
    }
    if (password!== result.password) {
      res.status(400).json({message: "Password Invalid!"})
    }
    res.json(result)
  } catch (err) {
   console.log(err.message) 
  }
}



