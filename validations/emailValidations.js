import express from 'express'
import { Validator } from 'node-input-validator';

  const emailValidtion = async (body) => {
    return new Promise(async (resolve, reject) => {
      try{
        console.log('bodyin vali', body)
      const v = new Validator(body, {
        email: 'required|email',
      });
      const matched = await v.check();
     let errorData= []
      if (!matched) {
        Object.values(v.errors).forEach((val) => {
            errorData.push(`${val.message}`);
        });
        resolve({ status: false, errors: errorData});
      } else {
        resolve({ status: true });
      }
    }catch(err){
      console.log(err);
      const error = new Error(err.message);   
      error.statusCode = 500; 
      reject(error)
    }
    });
};


const validateOTP = async (body) => {
  return new Promise(async (resolve, reject) => {
    try{
      console.log('bodyin vali', body)
    const v = new Validator(body, {
      email: 'required|email',
      otp:'required'
    });
    const matched = await v.check();
   let errorData= []
    if (!matched) {
      Object.values(v.errors).forEach((val) => {
          errorData.push(`${val.message}`);
      });
      resolve({ status: false, errors: errorData});
    } else {
      resolve({ status: true });
    }
  }catch(err){
    console.log(err);
    const error = new Error(err.message);   
    error.statusCode = 500; 
    reject(error)
  }
  });
}

export {emailValidtion, validateOTP} 