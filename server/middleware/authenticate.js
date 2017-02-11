import jwt from 'jsonwebtoken';
import config from '../common/config';
import User from '../models/user';

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(" ")[1];
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err){
                res.status(400).json({errors: 'authorization Header is not verified'})
            }else{
                User.find({'_id': decoded._id}, function(err, user){
                    if(err){
                        res.status(400).json({errors: 'No record found'})
                    }else{
                        req.user = decoded;
                        next()
                    }
                })
            }
        })
    }else{
        res.status(400).json({errors: 'authorization Header is missing'})
    }
}
