//return dispatch => {
// new Promise((resolve, reject) => {
//   return axios.post('api/auth/signup', data)
//   .then(response => {
//       console.log(response);
//     if (response.error) {
//         console.log('error', response);
//       //reject(formatErrors(response))
//     } else {
//         console.log('clean');
//       //resolve(response)
//     }
// }).catch((error) => {
//     console.log(error);
//     reject(SubmissionError(error.response.data.errors));
// })
// })

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    let errors = {}

    User.findOne( {'email': email}, function (err, user) {
         if(err){
             res.status(400).json(err);
         }
         if(!isEmpty(user)){
             if(user.validPassword(password)){
                 console.log('pass matched');
                //  const token = jwt.sign({
                //      id: user.id,
                //      username: user.username,
                //  }, config.jwtSecret);
                //  res.json({token})
             }else{
                 res.status(401).json({ errors: {form: 'invalid Credentials - Password doesn\'t matched'} });
             }
         }else{
             res.status(401).json({ errors: {form: 'invalid Credentials - No record found'} });
         }
    });
})
